import React from "react";
import { useHistory } from "react-router-dom";
import "./GroupDetail.css";

function GroupDetails({ name, city, state, about, members, preview, id }) {
  const history = useHistory();
  return (
    <div
      className="group_detail__container"
      onClick={() => history.push(`/groups/${id}`)}
    >
      <div>
        <img
          src={
            preview
              ? preview
              : "https://images.unsplash.com/photo-1511357840105-748c95f0a7e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTk2fHxmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60"
          }
          alt="Food Picture"
        />
        <div>
          <div>
            <span>{name}</span>
            <span>
              {city}, {state}
            </span>
          </div>
          <div>{about}</div>
          <span>
            {members} {members === 1 ? "member" : "members"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GroupDetails;
