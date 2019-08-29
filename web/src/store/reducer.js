import * as ACTIONS from "./action";

const defaultState = {
  isAddingEvent: false,
  isFetchingEvents: false,
  eventsMap: {}
};

const reducer = (state = defaultState, actions) => {
  switch (actions.type) {
    case ACTIONS.Types.CREATE_EVENT_REQUEST: {
      return {
        ...state,
        isAddingEvent: true
      };
    }
    case ACTIONS.Types.CREATE_EVENT_SUCCESS: {
      const event = actions.event;
      return {
        ...state,
        isAddingEvent: false,
        eventsMap: {
          ...state.eventsMap,
          [event._id]: event
        }
      };
    }
    case ACTIONS.Types.CREATE_EVENT_FAILURE: {
      return {
        ...state,
        isAddingEvent: false
      };
    }
    case ACTIONS.Types.FETCH_EVENTS_REQUEST: {
      return {
        ...state,
        isFetchingEvents: true
      };
    }
    case ACTIONS.Types.FETCH_EVENTS_SUCCESS: {
      const eventsMap = {};
      // TODO: store events order as received from api
      actions.events.forEach(e => (eventsMap[e._id] = e));
      return {
        ...state,
        eventsMap,
        isFetchingEvents: false
      };
    }
    case ACTIONS.Types.FETCH_EVENTS_FAILURE: {
      return {
        ...state,
        isFetchingEvents: false
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
