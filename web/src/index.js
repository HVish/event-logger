import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import "./index.scss";
import App from "./app";
import configureStore from "./store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

ReactDOM.render(
  <ReduxProvider store={reduxStore}>
    <App />
  </ReduxProvider>,
  document.getElementById("root")
);
