import React, { useEffect, useState } from "react";
import "./EventDetailsPage.css";
import { useParams, useHistory } from "react-router-dom";
import EventDetailsHeader from "./EventDetailsHeader";
import OtherEvents from "../OtherEvents";

function EventDetailsPage() {
  const history = useHistory();
  const { eventId } = useParams();
  const [event, setEvent] = useState();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const setEventDetails = async () => {
      const response = await fetch(`/api/events/${eventId}`);
      const data = await response.json();
      setEvent(data);
      return data;
    };

    setEventDetails().catch(console.error);
  }, [eventId]);

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

  let timeSt;
  let timeEnd;

  if (event) {
    const newDate = new Date(event.startDate);
    const startDateNum = newDate.getUTCDate();
    let startDay = days[newDate.getDay()];
    let startHour = newDate.getHours();
    let startMonth = monthNames[newDate.getMonth()];
    const startMinute = newDate.getMinutes();
    const startYear = newDate.getFullYear();

    const endDate = new Date(event.endDate);
    const endDateNum = endDate.getUTCDate();
    let endDay = days[endDate.getDay()];
    let endHour = endDate.getHours();
    let endMonth = monthNames[endDate.getMonth()];
    const endMinute = endDate.getMinutes();
    const endYear = endDate.getFullYear();

    timeSt = `${startDay}, ${startMonth}, ${startDateNum}, ${startYear} at ${
      startHour > 12 ? startHour - 12 : startHour
    }:${startMinute >= 10 ? startMinute : "0" + startMinute} PDT -`;

    timeEnd = `${endDay}, ${endMonth}, ${endDateNum}, ${endYear} at ${
      endHour > 12 ? endHour - 12 : endHour
    }:${endMinute >= 10 ? endMinute : "0" + endMinute} PDT`;
  }

  return (
    <div className="event_details__container">
      <EventDetailsHeader event={event} />
      <div className="event_details__body">
        <div>
          {event && event.Images[0] ? (
            <img src={event.Images[0]?.url} alt="Event Pic" />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1660309135532-4032c4409f28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60"
              alt="Event pic"
            />
          )}
          <div>
            <div className="location__container">
              <div>
                <i className="fa-solid fa-clock"></i>
                <div>
                  <span>{timeSt}</span>
                  <span>{timeEnd}</span>
                </div>
              </div>
              <div>
                <i className="fa-solid fa-location-crosshairs"></i>
                <div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${event?.Venue.lat}%2C${event?.Venue.lng}`}
                  >
                    <span>
                      {event && event?.Venue.address}
                      {event?.Venue.address !== "No Venue" && ", "}
                      {event && event?.Venue.city}
                      {event?.Venue.address !== "No Venue" && ", "}
                      {event && event?.Venue.state}
                    </span>
                  </a>
                </div>
              </div>
              {/* {map} */}
              <div className="event__map">
                <iframe
                  src={`https://www.google.com/maps?q=${event?.Venue.lat},${event?.Venue.lng}&hl=es;&output=embed`}
                  title={event?.Venue.id}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="event_details__description">
          <div>
            <h2>Details</h2>
            <p>{event && event.description}</p>
          </div>
          <div>
            <h2>Host</h2>
            <div
              className="group__picture_card"
              onClick={() => history.push(`/groups/${event?.Group.id}`)}
            >
              {event && event?.Group.previewImage ? (
                <img src={event?.Group.previewImage} alt="Event Pic" />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1660309135532-4032c4409f28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60"
                  alt="Event pic"
                />
              )}
              <div>
                <span>{event && event.Group.name}</span>
                <span>
                  {event && event.Group.city}, {event && event.Group.state}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OtherEvents />
    </div>
  );
}

export default EventDetailsPage;
