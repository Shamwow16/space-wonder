import React from "react";
import { shallow } from "enzyme";
import { ImageMetadataView } from "./ImageMetadataView";

let subject;

describe("ImageMetadataView", () => {
  const imageMetadata = {
    caption: "test caption",
    date: "test-date",
    sun_j2000_position: {
      x: "-100",
      y: "150",
      z: "300",
    },
  };

  beforeEach(() => {
    subject = shallow(<ImageMetadataView imageMetadata={imageMetadata} />);
  });
  it("renders an image caption", () => {
    const caption = subject.find(".imageCaption");
    expect(caption.length).toEqual(1);
  });
  it("renders an image date", () => {
    const date = subject.find(".imageDate");
    expect(date.length).toEqual(1);
  });
  it("renders the position of the sun in space", () => {
    const sunPosition = subject.find(".sunPosition");
    expect(sunPosition.length).toEqual(1);
  });
});
