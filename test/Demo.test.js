import React from "react";
import Cover from "../app/src/js/components/Cover";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const component = renderer.create(<Cover />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.children[0].children[1].props.onClick();
  // console.log(tree.children[0].children[1].props.onClick())

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});