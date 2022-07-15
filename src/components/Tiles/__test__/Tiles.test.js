import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import Tiles from "../";

const tiles = [
  {
    uuid: 1,
    title: "Tile 1",
  },
  {
    uuid: 2,
    title: "Tile 2",
  },
  {
    uuid: 3,
    title: "Tile 3",
  },
  {
    uuid: 4,
    title: "Tile 4",
  },
];
describe("Headings", () => {
  describe("Title", () => {
    test("renders", () => {
      render(<Tiles renderItem={() => false} />);

      const elm = screen.getByTestId("tiles");

      expect(elm).toBeInTheDocument();
    });

    test("should have exact tiles", () => {
      render(<Tiles items={tiles} renderItem={() => false} />);

      const elm = screen.getAllByTestId("tile");

      expect(elm.length).toEqual(tiles.length);
    });

    test("matches snapshot - empty", () => {
      const tree = renderer.create(<Tiles renderItem={() => false} />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    test("matches snapshot - 4 items", () => {
      const tree = renderer
        .create(<Tiles items={tiles} renderItem={() => false} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
