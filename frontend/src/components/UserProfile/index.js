import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./UserProfile.css";

function UserProfile() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [groupsJoined, setGroupsJoined] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users/current-user/groups");
      const data = await response.json();
      setGroupsJoined(data.Groups);
      return data;
    };

    fetchData().catch(console.error);
  }, []);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className="profile__container">
        <div>
          <button>{sessionUser.firstName[0]}</button>
          <span>
            {sessionUser.firstName} {sessionUser.lastName}
          </span>
        </div>
        <div>
          <div>
            <span>My Groups</span>
            {groupsJoined.length > 0 &&
              groupsJoined.map((group) => (
                <div
                  onClick={() => history.push(`/groups/${group.id}`)}
                  className="profile_groups__link"
                  key={"profile"+group.id}
                >
                  <div>{group.name}</div>
                  <img src={group.previewImage} alt="" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
