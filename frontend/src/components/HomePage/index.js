import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../store/events";
import { getAllGroups } from "../../store/groups";
import UpcomingEvent from "./UpcomingEvent";
import PopularGroup from "./PopularGroup";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchName, setSearchName] = useState();
  const allEvents = Object.values(useSelector((state) => state.events));
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const allGroups = Object.values(useSelector((state) => state.groups));
  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  async function handleSearch(e) {
    e.preventDefault();

    history.push(`/events?name=${searchName}`);
  }

  const events = allEvents.slice(0, 4);

  const groups = allGroups.slice(0, 3);

  return (
    <div className="home_page__container">
      <div className="home_page__main">
        <div className="home_page__header">
          <div>
            <h1>
              Celebrating 20 years of real connections on <span>CookUp</span>
            </h1>
            <p>
              Your new community is waiting for you. For 20 years, millions of
              people have chosen CookUp. CookUp to make real connections over
              the things that matter. Start a group today.
            </p>
          </div>
          <img
            src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640"
            alt="Cook-up Image"
          />
        </div>
        <div className="home_page__events_groups">
          <div onClick={() => history.push("/groups")}>
            <img
              src="https://v.fastcdn.co/u/f91f856b/56342857-0-Hola.png"
              alt="Dialog image"
            />
            <h3>Find a Group</h3>
            <p>Do what you love, share what you know, find your community.</p>
          </div>
          <div onClick={() => history.push("/events")}>
            <img
              src="https://v.fastcdn.co/u/f91f856b/56343282-0-Tickets.png"
              alt="Tickets image"
            />
            <h3>Attend a CookUp</h3>
            <p>Something amazing is being cooked up near you everyday!</p>
          </div>
          <div onClick={() => history.push("/events")}>
            <img
              src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256"
              alt="High Five"
            />
            <h3>Find your Passion</h3>
            <p>
              Explore new events. Folks looking to learn and share good eats.
            </p>
          </div>
        </div>
        <div className="home_page__sub__links">
          <div onClick={() => history.push("/groups")}>
            <img
              src="https://images.unsplash.com/photo-1613109040830-ffdd96756f5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGZyaWVuZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60"
              alt="Friends at a dinner table"
            />
            <span>
              Meet new foodies <i className="fa-solid fa-arrow-right fa-xl"></i>
            </span>
          </div>
          <div onClick={() => history.push("/events")}>
            <img
              src="https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmluZSUyMGRpbmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="dining table"
            />
            <span>
              Attend a CookUp <i className="fa-solid fa-arrow-right fa-xl"></i>
            </span>
          </div>
          <div onClick={() => history.push("/groups")}>
            <img
              src="https://images.unsplash.com/photo-1533143708019-ea5cfa80213e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZmluZSUyMGRpbmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="Food image"
            />
            <span>
              Get inspired <i className="fa-solid fa-arrow-right fa-xl"></i>
            </span>
          </div>
        </div>
        <div className="home_page_search__container">
          <div>
            <h2>Looking for a CookUp?</h2>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder='Search for "Pop-up"'
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button>Search</button>
            </form>
          </div>
          <div>
            <h2>See what's happening</h2>
            <div>
              <button onClick={() => history.push("/events")}>Events</button>
              <button onClick={() => history.push("/groups")}>Groups</button>
            </div>
          </div>
        </div>
      </div>
      <div className="home_page__how">
        <h2>How CookUp Works</h2>
        <span>
          If you love to cook or just love to eat come join our growing community.
          It's free to create an account. Link up with fellow foodies! Build your own community or find a food event happening near you!
        </span>

        {/* Link to Sign up */}
        {/* <Link to="/signup" className="home-page__secondary-content__signup">
          Join HackUp
        </Link> */}
      </div>

      <div className="home- gipage__tertiary-content">
        {/* Upcoming Events */}
        <div className="upcoming-events-header">
          <h2>Upcoming events</h2>
          <Link to="/events" className="upcoming-events-header__explore">
            Explore more events
          </Link>
        </div>
        <div className="upcoming-events__container">
          <div className="upcoming-events">
            {events.map((event) => (
              <UpcomingEvent
                key={event.id}
                preview={event.previewImage}
                name={event.name}
                group={event.Group.name}
                id={event.id}
                startDate={event.startDate}
              />
            ))}
          </div>
        </div>

        {/* Popular Groups */}
        <div className="upcoming-groups-header">
          <h2>Popular groups</h2>
          <Link to="/groups" className="upcoming-groups-header__explore">
            Explore more groups
          </Link>
        </div>
        <div className="popular-groups-container">
          <div className="popular-groups-container__popular-groups">
            {groups.map((group) => (
              <PopularGroup
                key={group.id}
                name={group.name}
                about={group.about}
                preview={group.previewImage}
                id={group.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
