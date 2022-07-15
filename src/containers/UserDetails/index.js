import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const Container = styled(Paper)(() => ({
  outline: 0,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: 24,
  maxWidth: 400,
  gap: 8,
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#404344",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
}));

const itemsMap = [
  { prop: "name", label: "Name: " },
  { prop: "email", label: "Email: " },
  { prop: "gender", label: "Gender: " },
  { prop: "timezone", label: "Timezone: " },
  { prop: "place", label: "Address: " },
  { prop: "dob", label: "Date of Birth: " },
];

export default function UserDetails() {
  const params = useParams();
  const users = useSelector((state) => state.users.data);
  const currentUser = users.find((u) => u.uuid === params.id);

  if (currentUser) {
    return (
      <Container>
        <Item>
          <Avatar
            alt={currentUser.name}
            src={currentUser.avatar}
            sx={{ width: 200, height: 200 }}
          />
        </Item>
        {itemsMap.map((cell) => (
          <Item key={cell.prop}>
            <span>{cell.label}</span>
            <span>{currentUser[cell.prop]}</span>
          </Item>
        ))}
      </Container>
    );
  }

  return <Container>Unknown Employee</Container>;
}
