import { jsonRequest } from "../utils";

export const Types = {
  CREATE_EVENT_REQUEST: "CREATE_EVENT_REQUEST",
  CREATE_EVENT_SUCCESS: "CREATE_EVENT_SUCCESS",
  CREATE_EVENT_FAILURE: "CREATE_EVENT_FAILURE",

  FETCH_EVENTS_REQUEST: "FETCH_EVENTS_REQUEST",
  FETCH_EVENTS_SUCCESS: "FETCH_EVENTS_SUCCESS",
  FETCH_EVENTS_FAILURE: "FETCH_EVENTS_FAILURE"
};

const api = "http://localhost:5000";

export const createEvent = data => {
  return async dispatch => {
    dispatch({ type: Types.CREATE_EVENT_REQUEST });
    try {
      const response = await jsonRequest(`${api}/events`, "POST", data);
      const event = await response.json();
      dispatch({ type: Types.CREATE_EVENT_SUCCESS, event });
    } catch (err) {
      console.log(err);
      dispatch({ type: Types.CREATE_EVENT_FAILURE });
    }
  };
};

export const fetchEvents = () => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_EVENTS_REQUEST });
    try {
      const response = await jsonRequest(`${api}/events`, "GET");
      const events = await response.json();
      dispatch({ type: Types.FETCH_EVENTS_SUCCESS, events });
    } catch (err) {
      console.log(err);
      dispatch({ type: Types.FETCH_EVENTS_FAILURE });
    }
  };
};
