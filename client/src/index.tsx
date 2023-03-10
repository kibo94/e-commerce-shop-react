import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";
import { PopupContextProvider } from "./contexts/PopupContext";
import axios from "axios";

import { SideBarContextProvider } from "./contexts/SideBarContext";
axios.defaults.baseURL = "https://e-commerce-api-8p0f.onrender.com";
// axios.defaults.baseURL = "http://localhost:4000"
ReactDOM.render(
  <BrowserRouter>
    <SideBarContextProvider>
      <ThemeContextProvider>
        <PopupContextProvider>
          <App />
        </PopupContextProvider>
      </ThemeContextProvider>
    </SideBarContextProvider>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
