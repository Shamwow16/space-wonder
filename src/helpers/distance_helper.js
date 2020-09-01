// Using the Haversine formula to calculate the distance between two sets of longitude and latitude
export const distance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;
  const cosine = Math.cos;
  const a =
    0.5 -
    cosine((lat2 - lat1) * p) / 2 +
    (cosine(lat1 * p) * cosine(lat2 * p) * (1 - cosine((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
};
