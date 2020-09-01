import React, { useEffect, useState } from "react";
import { distance } from "../../helpers/distance_helper";
import { ImageMetadataView } from "../ImageMetadataView/ImageMetadataView";
import axios from "axios";
import moment from "moment";
import "./Dashboard.css";

export const Dashboard = () => {
  const [issLocation, setIssLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [imagesMetadata, setImagesMetadata] = useState([]);
  const [closestImage, setClosestImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const findClosestImage = () => {
    if (imagesMetadata.length == 0) return;
    const { latitude: issLat, longitude: issLon } = issLocation;
    const closestImage = imagesMetadata.reduce(
      (prevMetadata, currentMetadata) => {
        const {
          lat: currentImageLat,
          lon: currentImageLon,
        } = currentMetadata.centroid_coordinates;
        const {
          lat: prevImageLat,
          lon: prevImageLon,
        } = prevMetadata.centroid_coordinates;
        return distance(issLat, issLon, prevImageLat, prevImageLon) <
          distance(issLat, issLon, currentImageLat, currentImageLon)
          ? prevMetadata
          : currentMetadata;
      }
    );
    return closestImage;
  };

  const formatImageUrl = (closestImage) => {
    const baseUrl = "https://api.nasa.gov/EPIC/archive/natural";
    const timestamp = closestImage.identifier;
    const year = timestamp.slice(0, 4);
    const month = timestamp.slice(4, 6);
    const day = timestamp.slice(6, 8);

    return `${baseUrl}/${year}/${month}/${day}/png/${closestImage.image}.png?api_key=${process.env.REACT_APP_NASA_API_KEY}`;
  };

  const getLastWeekDateStamps = () => {
    const dates = [...Array(30)].map((_, i) =>
      moment().subtract(i, "d").format("YYYY-MM-DD")
    );
    return dates;
  };

  const setRequestsForPastWeek = () => {
    return getLastWeekDateStamps().map((dateStamp) => {
      return axios.get(
        `https://api.nasa.gov/EPIC/api/natural/date/${dateStamp}?api_key=${process.env.REACT_APP_NASA_API_KEY}`
      );
    });
  };

  useEffect(() => {
    axios
      .get("http://api.open-notify.org/iss-now.json")
      .then((response) => {
        const { iss_position } = response.data;
        const { latitude, longitude } = iss_position;
        setIssLocation({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        });
        axios.all(setRequestsForPastWeek()).then(
          axios.spread((...responses) => {
            const allImagesMetadata = responses.flatMap((res) => res.data);
            setImagesMetadata(allImagesMetadata);
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!imagesMetadata.length) return;
    const image = findClosestImage();
    setClosestImage(image);
    const imageUrl = formatImageUrl(image);

    setImageUrl(imageUrl);
  }, [imagesMetadata]);

  return (
    <div className="App">
      {imageUrl && (
        <div className="appContainer">
          <h1>Current ISS Coordinates</h1>
          <h2>Latitude: {issLocation.latitude}</h2>
          <h2>Longitude: {issLocation.longitude}</h2>
          <ImageMetadataView imageMetadata={closestImage} />
          <div className="imageContainer">
            <img src={imageUrl} />
          </div>
        </div>
      )}
    </div>
  );
};
