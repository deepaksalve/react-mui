import React from "react";
import Grid from "@mui/material/Grid";

export default function Tiles({ items, renderItem }) {
  return (
    <Grid container spacing={2} sx={{ px: 2 }} data-testid="tiles">
      {Array.isArray(items) &&
        items.map((item) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={3}
            xl={2}
            key={item.uuid}
            data-testid="tile"
          >
            {renderItem(item)}
          </Grid>
        ))}
    </Grid>
  );
}
