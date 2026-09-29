import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import "./index.css";
import { theme } from "./themes/theme";
import { App } from "./App";
import "./design/skin-terminal.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
