import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
//import { AuthContexProvider } from "./context/auth-context";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
