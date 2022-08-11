import React from "react";
import "./EventDetails.css";
import { useHistory } from "react-router-dom";

//prettier-ignore
function EventDetails({name, group, city, state, attendees, preview, id, startDate, }) {
  const history = useHistory()
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

  const newDate = new Date(startDate);
  const date = newDate.getUTCDate();
  let day = days[newDate.getDay()];
  let hours = newDate.getHours();
  let month = monthNames[newDate.getMonth()];
  const minutes = newDate.getMinutes();

  const timeStr = `${day}, ${month} ${date} · ${
    hours > 12 ? hours - 12 : hours
  }:${minutes >= 10 ? minutes : "0" + minutes} ${
    hours > 12 ? "PM" : "AM"
  } PDT`;

  return (
    <div
    className="event_detail__container"
    onClick={()=> history.push(`/events/${id}`)}
    >
      <div>
        <img
          src={
            preview
              ? preview
              : "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          }
          alt="Food picture"
        />
        <div>
          <div>
            <span>{timeStr}</span>
            <span>{name}</span>
          </div>
          <div>
            <span className="event-details-group-name">
              {group}
            </span>
            <span>
              {city}{city && ','} {state}
            </span>
          </div>
          <span>
            {attendees} {attendees === 1 ? "attendee" : "attendees"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
