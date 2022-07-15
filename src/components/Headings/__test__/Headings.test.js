import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import { Title, SubTitle } from "../";

describe("Headings", () => {
  describe("Title", () => {
    test("renders", () => {
      render(<Title>This is a title</Title>);

      const elm = screen.getByTestId("title");

      expect(elm).toBeInTheDocument();
    });

    test("should content correct text", () => {
      render(<Title>This is a title</Title>);

      const elm = screen.getByTestId("title");

      expect(elm).toHaveTextContent("This is a title");
    });

    test("matches snapshot", () => {
      const tree = renderer.create(<Title>This is a title</Title>).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe("SubTitle", () => {
    test("renders", () => {
      render(<SubTitle>This is a subtitle</SubTitle>);

      const elm = screen.getByTestId("subtitle");

      expect(elm).toBeInTheDocument();
    });

    test("should content correct text", () => {
      render(<SubTitle>This is a subtitle</SubTitle>);

      const elm = screen.getByTestId("subtitle");

      expect(elm).toHaveTextContent("This is a subtitle");
    });

    test("matches snapshot", () => {
      const tree = renderer
        .create(<SubTitle>This is a subtitle</SubTitle>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
