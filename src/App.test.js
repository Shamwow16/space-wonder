import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("renders the Dashboard", () => {
  const subject = shallow(<App />);
  expect(subject.find("Dashboard").length).toEqual(1);
});
