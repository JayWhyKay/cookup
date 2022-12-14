import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./GroupUpcomingEvents.css";

function GroupUpcomingEvents() {
  const { groupId } = useParams();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const getGroupEvents = async () => {
      const response = await fetch(`/api/groups/${groupId}/events`);
      const data = await response.json();
      setUpcomingEvents(data.Events);
    };

    getGroupEvents().catch(console.error);
  }, [groupId]);

  let days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let timeStrings = [];

  if (upcomingEvents.length > 0) {
    timeStrings = new Array(upcomingEvents.length).fill("");

    upcomingEvents.forEach((event, idx) => {
      let startDate = event.startDate;
      const newDate = new Date(startDate);
      const date = newDate.getUTCDate();
      let day = days[newDate.getDay()];
      let hours = newDate.getHours();
      let month = monthNames[newDate.getMonth()];
      const minutes = newDate.getMinutes();
      let year = newDate.getFullYear();
      timeStrings[idx] = `${day}, ${month} ${date}, ${year} · ${
        hours > 12 ? hours - 12 : hours
      }:${minutes >= 10 ? minutes : "0" + minutes} ${
        hours > 12 ? "PM" : "AM"
      } PDT`;
    });
  }

  return (
    <div className="upcoming_event__container">
      {upcomingEvents.length > 0 &&
        upcomingEvents.map((event, idx) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="upcoming_event__link"
          >
            <div>
              <time>{timeStrings[idx]}</time>
              <span>{event.name}</span>
            </div>
            <div>
              <i className="fa-solid fa-user-large"></i>{" "}
              <span>
                {event.numAttending}{" "}
                {event.numAttending === 1 ? "attendee" : "attendees"}{" "}
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default GroupUpcomingEvents;
