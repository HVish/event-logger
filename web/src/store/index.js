import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );
  return store;
}
