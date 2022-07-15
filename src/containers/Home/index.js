import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Tiles from "../../components/Tiles";
import UserCard from "../../components/UserCard";

import { fuzzySearch } from "../../utils/common";
import { updateFilter } from "../../store/filters-slice";
import { FUZZY_SEARCH_ON_PROPS } from "../../config/constants";

export default function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const filterValue = useSelector((state) => state.filters.value);
  const [tiles, setTiles] = React.useState([]);
  React.useEffect(() => {
    if (filterValue.length) {
      const filtered = fuzzySearch(users, FUZZY_SEARCH_ON_PROPS, filterValue);
      setTiles(filtered);
    } else {
      setTiles(users);
    }
  }, [filterValue, users]);

  React.useEffect(() => {
    return () => {
      dispatch(updateFilter(""));
    };
  }, [dispatch]);

  if (tiles.length) {
    return (
      <Tiles
        items={tiles}
        renderItem={(item) => {
          const id = item.uuid;

          return (
            <Link to={`/users/${id}`} key={id}>
              <UserCard
                id={id}
                title={item.name.slice(0, 20)}
                subTitle={item.gender}
                image={item.avatar}
              />
            </Link>
          );
        }}
      />
    );
  }

  return (
    <Grid
      item
      sx={{
        gap: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom component="div">
        No results...
      </Typography>
    </Grid>
  );
}
