import React from "react";
import Box from "@mui/material/Box";

export default function Spacer({ dx, dy }) {
  const sx = {};

  if (dx) {
    sx.paddingTop = dx;
    sx.paddingBottom = dx;
  }

  if (dy) {
    sx.paddingLeft = dy;
    sx.paddingRight = dy;
  }

  return <Box sx={sx} data-testid="spacer" />;
}
