import React from "react";
import "./ImageMetadataView.css";
export const ImageMetadataView = ({ imageMetadata }) => {
  const { sun_j2000_position: sunPositionCoordinates } = imageMetadata;
  return (
    <div className="imageMetadataView">
      <h1>Image Data</h1>
      <p className="imageCaption">{imageMetadata.caption}</p>
      <p className="imageDate">
        Image Capture Datetime: <span>{imageMetadata.date}</span>
      </p>
      <p className="sunPosition">
        Position of the Sun in space:{" "}
        <span>
          x: {sunPositionCoordinates.x}, y: {sunPositionCoordinates.y}, z:{" "}
          {sunPositionCoordinates.z}
        </span>
      </p>
    </div>
  );
};
