import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../store/events";
import "./EventDetailsHeader.css";

function EventDetailsHeader({ event }) {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const [groupDetails, setGroupDetails] = useState();

  useEffect(() => {
    const getEventDetails = async () => {
      let response = await fetch(`/api/events/${eventId}`);
      let data = await response.json();
      setEventDetails(data);
    };

    getEventDetails().catch(console.error);
  }, [eventId]);

  useEffect(() => {
    const getGroupDetails = async () => {
      let response = await fetch(`/api/groups/${eventDetails?.Group.id}`);
      let data = await response.json();
      setGroupDetails(data);
    };

    if (eventDetails) {
      getGroupDetails().catch(console.error);
    }
  }, [eventDetails]);

  async function handleDelete() {
    await dispatch(deleteEvent(eventId));

    history.push("/events");
  }

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

  let timeStr;
  if (event) {
    const newDate = new Date(event.startDate);
    const date = newDate.getUTCDate();
    let day = days[newDate.getDay()];
    let month = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();
    // const minutes = newDate.getMinutes();
    // let hours = newDate.getHours();

    timeStr = `${day}, ${month} ${date}, ${year}`;
  }

  return (
    <div className="event_header__container">
      <div>
        <time>{timeStr}</time>
        <h2>
          {event && event.name}
          {sessionUser && eventDetails && groupDetails && (
            <div>
              <i
                className="fa-regular fa-pen-to-square fa-lg"
                onClick={() => setShowMenu(!showMenu)}
              ></i>
              {showMenu && (
                <div className="event_edit_dropdown">
                  <div onClick={() => history.push(`/events/edit/${eventId}`)}>
                    Edit event
                  </div>
                  <div onClick={handleDelete}>Delete event</div>
                </div>
              )}
            </div>
          )}
        </h2>
        <div className="event_organizer">
          <i className="fa-solid fa-utensils"></i>
          <div>
            <span>Hosted By:</span>
            <span>{event && event.Group.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsHeader;
