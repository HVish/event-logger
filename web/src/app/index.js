import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./app.scss";
import * as ACTIONS from "../store/action";

function App() {
  const eventsMapSelector = useSelector(state => state.eventsMap);
  const dispatch = useDispatch();

  const events = useMemo(() => Object.values(eventsMapSelector), [
    eventsMapSelector
  ]);

  const [eventInput, setEventInput] = useState("");
  const onEventInputChange = useCallback(e => setEventInput(e.target.value), [
    setEventInput
  ]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(ACTIONS.createEvent({ details: eventInput }));
    },
    [dispatch, eventInput]
  );

  useEffect(() => void dispatch(ACTIONS.fetchEvents()), [dispatch]);

  return (
    <div className="app">
      <header>
        <input
          type="text"
          placeholder="add your event"
          value={eventInput}
          onChange={onEventInputChange}
        />
        <button onClick={onSubmit}>Add Event</button>
      </header>
      <main>
        {events.map(e => (
          <div key={e._id}>
            {e.details} at{" "}
            {new Date(e.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </div>
        ))}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
