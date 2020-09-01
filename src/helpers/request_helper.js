import moment from "moment";
import axios from "axios";

export const formatImageUrl = (closestImage) => {
  const baseUrl = "https://api.nasa.gov/EPIC/archive/natural";
  const timestamp = closestImage.identifier;
  const year = timestamp.slice(0, 4);
  const month = timestamp.slice(4, 6);
  const day = timestamp.slice(6, 8);

  return `${baseUrl}/${year}/${month}/${day}/png/${closestImage.image}.png?api_key=${process.env.REACT_APP_NASA_API_KEY}`;
};

const getLastWeekDateStamps = () => {
  const dates = [...Array(2)].map((_, i) =>
    moment().subtract(i, "d").format("YYYY-MM-DD")
  );
  return dates;
};

export const setRequestsForPastWeek = () => {
  return getLastWeekDateStamps().map((dateStamp) => {
    return axios.get(
      `https://api.nasa.gov/EPIC/api/natural/date/${dateStamp}?api_key=${process.env.REACT_APP_NASA_API_KEY}`
    );
  });
};
