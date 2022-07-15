import React from "react";
import { useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";

import Home from "./containers/Home";
import UserDetails from "./containers/UserDetails";
import Header from "./components/Header";
import Spacer from "./components/Spacer";

import { loadUsers } from "./store/users-slice";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadUsers({ results: 10 }));
  }, [dispatch]);

  return (
    <Container disableGutters>
      <Header />
      <Spacer dx={1} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/:id" element={<UserDetails />} />
      </Routes>
    </Container>
  );
}

export default App;
