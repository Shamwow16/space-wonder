import React, { useEffect, useState } from "react";
import { distance } from "../../helpers/distance_helper";
import {
  formatImageUrl,
  setRequestsForPastWeek,
} from "../../helpers/request_helper";
import { ImageMetadataView } from "../ImageMetadataView/ImageMetadataView";
import axios from "axios";
import "./Dashboard.css";

export const Dashboard = () => {
  const [issLocation, setIssLocation] = React.useState({
    latitude: null,
    longitude: null,
  });
  const [imagesMetadata, setImagesMetadata] = React.useState([]);
  const [closestImage, setClosestImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

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
    <div className="dashboardContainer">
      {imageUrl ? (
        <div className="dashboard">
          <div className="infoContainer">
            <div className="issInformationContainer">
              <h1>Current ISS Coordinates</h1>
              <p>Latitude: {issLocation.latitude}</p>
              <p>Longitude: {issLocation.longitude}</p>
            </div>
            <ImageMetadataView imageMetadata={closestImage} />
          </div>
          <div className="imageContainer">
            <img src={imageUrl} />
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};
