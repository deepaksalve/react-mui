import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

import { Title, SubTitle } from "../Headings";

export default function UserCard({ image, title, subTitle }) {
  return (
    <Card raised sx={{ cursor: "pointer" }}>
      <CardActionArea>
        <CardContent
          sx={{
            gap: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar alt={title} src={image} sx={{ width: 100, height: 100 }} />
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
