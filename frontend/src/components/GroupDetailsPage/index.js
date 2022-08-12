import React, { useEffect, useState } from "react";
import "./GroupDetailsPage.css";
import GroupDetailsHeader from "./GroupDetailsHeader";
import GroupUpcomingEvents from "./GroupUpcomingEvents";
import GroupOrganizerAndMembers from "./GroupOrganizerAndMembers";
import { useParams } from "react-router-dom";

function GroupDetailsPage() {
  const { groupId } = useParams();

  const [groupDetails, setGroupDetails] = useState();

  useEffect(() => {
    const getGroupDetails = async () => {
      let response = await fetch(`/api/groups/${groupId}`);
      let data = await response.json();
      setGroupDetails(data);
    };

    getGroupDetails().catch(console.error);
  }, [groupId]);

  return (
    <div className="group_detail__landing">
      <GroupDetailsHeader />
      <div className="group_detail__body">
        <div>
          <GroupOrganizerAndMembers
            organizerFirstName={
              groupDetails && groupDetails.Organizer.firstName
            }
            organizerLastName={groupDetails && groupDetails.Organizer.lastName}
            numMembers={groupDetails && groupDetails.numMembers}
          />
          <h4>About us:</h4>
          <span>{groupDetails && groupDetails.about}</span>
        </div>
        <div>
          <h4>Upcoming Events</h4>
          <GroupUpcomingEvents />
        </div>
      </div>
    </div>
  );
}

export default GroupDetailsPage;
