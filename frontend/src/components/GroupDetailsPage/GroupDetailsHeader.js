import React, { useState, useEffect } from "react";
import "./GroupDetailsHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "../../store/groups";
import { useParams, useHistory, Link } from "react-router-dom";

function GroupDetailsHeader() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [groupDetails, setGroupDetails] = useState();

  useEffect(() => {
    const getGroupDetails = async () => {
      let response = await fetch(`/api/groups/${groupId}`);
      let data = await response.json();
      setGroupDetails(data);
    };

    getGroupDetails().catch(console.error);
  }, [groupId]);

  async function handleDelete() {
    await dispatch(deleteGroup(groupId));

    history.push("/groups");
  }

  return (
    <>
      <div className="group_details_header__container">
        <div>
          <img
            src={
              groupDetails &&
              (groupDetails?.Images[0]?.url ||
                "https://images.unsplash.com/photo-1586718520704-f7f9db04b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHdpbmUlMjBkaW5uZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60")
            }
            alt="Food Pic"
          />
          <div>
            <h2>
              {groupDetails && groupDetails.name}
              {sessionUser &&
                groupDetails &&
                sessionUser.id === groupDetails.organizerId && (
                  <div>
                    <i
                      className="fa-regular fa-pen-to-square fa-lg"
                      onClick={() => setShowMenu(!showMenu)}
                    ></i>
                    {showMenu && (
                      <div>
                        <div
                          onClick={() =>
                            history.push(`/groups/edit/${groupId}`)
                          }
                        >
                          Edit group
                        </div>
                        <div onClick={handleDelete}>Delete group</div>
                      </div>
                    )}
                  </div>
                )}
            </h2>
            <div className="group__location">
              <i className="fa-solid fa-location-crosshairs"></i>{" "}
              <span>
                {groupDetails && groupDetails.city},{" "}
                {groupDetails && groupDetails.state}
              </span>
            </div>
            <div className="group__organizer">
              <i className="fa-solid fa-lightbulb"></i>{" "}
              <span>
                Organized By {groupDetails && groupDetails.Organizer.firstName}{" "}
                {groupDetails && groupDetails.Organizer.lastName}
              </span>
            </div>
            <div className="group__total_members">
              <i className="fa-solid fa-users"></i>{" "}
              <span>
                {groupDetails && groupDetails.numMembers}{" "}
                {groupDetails && groupDetails.numMembers === 1
                  ? "member"
                  : "members"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {sessionUser &&
        groupDetails &&
        sessionUser.id === groupDetails.organizerId && (
          <div className="create_event__button">
            <Link to={`/groups/${groupId}/create-event`}>
              <button>Host an Event</button>
            </Link>
          </div>
        )}
    </>
  );
}

export default GroupDetailsHeader;
