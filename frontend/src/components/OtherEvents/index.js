import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/events";
import { Link } from "react-router-dom";
import "./OtherEvents.css";
import OtherEventCard from "./OtherEventCard";

function OtherEvents() {
  const dispatch = useDispatch();
  const allEvents = Object.values(useSelector((state) => state.events));


  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const events = allEvents.slice(0, 3);

  return (
    <div className="other_events__container">
      <div>
        <h2>Other Events</h2>
        <div className="other_events__content">
          {events.length > 0 &&
            events.map((event) => (
              <Link
                to={`/events/${event.id}`}
                className="other_event__link"
                key={event.id}
                onClick={()=>window.scroll(0,0)}
              >
                <OtherEventCard
                  key={event.id}
                  id={event.id}
                  name={event.name}
                  city={event?.Venue?.city || "New York"}
                  state={event?.Venue?.state || "NY"}
                  group={event?.Group?.name}
                  attendees={event.numAttending}
                  startDate={event.startDate}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default OtherEvents;
