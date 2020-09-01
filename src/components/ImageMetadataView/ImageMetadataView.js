import React from "react";
import { distance } from "../../helpers/distance_helper";

export const ImageMetadataView = ({ imageMetadata }) => {
  return (
    <div>
      <h1>Image Data</h1>
      <h3>{imageMetadata.caption}</h3>
      <h4>
        Image Capture Datetime: <span>{imageMetadata.date}</span>
      </h4>
    </div>
  );
};
