import React from "react";
import "./GroupOrganizerAndMembers.css";

function GroupOrganizerAndMembers({
  organizerFirstName,
  organizerLastName,
  numMembers,
}) {
  return (
    <div className="organizer__container">
      <h4>Organizer/Members</h4>
      <div className="organizer__details">
        <div>
          <button>{organizerFirstName && organizerFirstName[0]}</button>
          <span>
            {organizerFirstName}, {organizerLastName}
          </span>
        </div>
        <span>Members: {numMembers}</span>
      </div>
    </div>
  );
}

export default GroupOrganizerAndMembers;
