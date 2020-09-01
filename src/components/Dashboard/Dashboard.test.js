import React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "./Dashboard";

let subject;

describe("Dashboard", () => {
  it("renders a loading state when data has not been retrieved yet", () => {
    subject = shallow(<Dashboard />);
    expect(subject.find(".loader").length).toEqual(1);
  });

  it("renders the ImageMetaDataView when data has been retrieved", () => {
    const realUseState = React.useState;

    const stubInitialState = [
      {
        latitude: 50,
        longitude: 50,
      },
    ];

    const imagesMetadata = [
      {
        centroid_coordinates: {
          lat: 60,
          lon: 60,
        },
      },
      {
        centroid_coordinates: {
          lat: -50,
          lon: -100,
        },
      },
    ];

    const closestImage = [
      {
        centroid_coordinates: {
          lat: 60,
          lon: 60,
        },
      },
    ];

    const imageUrl = ["testUrl"];

    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => realUseState(stubInitialState))
      .mockImplementationOnce(() => realUseState(imagesMetadata))
      .mockImplementationOnce(() => realUseState(closestImage))
      .mockImplementationOnce(() => realUseState(imageUrl));

    subject = shallow(<Dashboard />);
    expect(subject.find("ImageMetadataView").length).toEqual(1);
  });
});
