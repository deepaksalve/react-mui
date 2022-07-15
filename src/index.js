import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ThemeWrapper } from "./components/AppTheme";
import store from "./store";

import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </BrowserRouter>
  </Provider>
);
