import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editGroup } from "../../store/groups";
import './EditGroupForm.css'

function EditGroupForm() {
  let { groupId } = useParams();
  const [group, setGroup] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("Online");
  const [isPrivate, setIsPrivate] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const getGroup = async () => {
      let response = await fetch(`/api/groups/${groupId}`);
      let data = await response.json();
      setGroup(data);
      setName(data.name);
      setAbout(data.about);
      setType(data.type);
      setCity(data.city);
      setIsPrivate(data.private);
      setState(data.state);
      return data;
    };

    getGroup().catch(console.error);
  }, [groupId]);

  useEffect(() => {
    const errors = [];
    if (name.length > 60) errors.push("Name must be 60 characters or less");
    if (about.length < 50) errors.push("About must be 50 characters or more");

    setValidationErrors(errors);
  }, [name, about]);

  async function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationErrors.length > 0) {
      return;
    }

    const info = {
      name,
      about,
      type,
      private: isPrivate,
      city,
      state,
    };

    let createdGroup = await dispatch(editGroup(groupId, info));

    history.push(`/groups/${createdGroup.id}`);
  }

  return (
    <div className="edit_group_form__container">
      <div>
        <h1>
          Edit
          <i className="fa-solid fa-xmark fa-lg" onClick={()=>history.push(`/groups/${groupId}`)}></i>
        </h1>
        <span>{group && group.name}</span>
        <form onSubmit={handleSubmit}>
          <ul>
            {hasSubmitted &&
              validationErrors.length > 0 &&
              validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>
            Group Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            About
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />
          </label>
          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <div className="edit_group__selection">
            <label>
              Type
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Online">Online</option>
                <option value="In person">In Person</option>
              </select>
            </label>
            <label
              onChange={(e) => setIsPrivate(e.target.value)}
            >
              Private?
              <select value={isPrivate}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </label>
          </div>
          <button type="submit">Edit Group</button>
        </form>
      </div>
    </div>
  );
}

export default EditGroupForm;
