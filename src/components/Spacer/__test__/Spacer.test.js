import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import Spacer from "../";

describe("Spacer", () => {
  test("renders", () => {
    render(<Spacer />);
    const elm = screen.getByTestId("spacer");

    expect(elm).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const tree = renderer.create(<Spacer />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
