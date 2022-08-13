import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import Slide from "@mui/material/Slide";

import { setPersonalInformation, updateInfo } from "./store/userFormSlice";
import { areSameObjects } from "../../utils";

function FormPersonalInfo({ handleNext }) {
  const { personalInfo, isLoading, userId, canRetry } = useSelector(
    (state) => state.userForm
  );

  const dispatch = useDispatch();
  const { name, email, mob, address1, address2, address3 } = personalInfo;
  const [state, setState] = useState({
    name,
    email,
    mob,
    address1,
    address2,
    address3,
  });
  const [formErrors, setFormErrors] = useState("");

  const validate = (values) => {
    let errors = "";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors = "This is not a valid email format!";
    }
    if (
      !values.name ||
      !values.mob ||
      !values.address1 ||
      !values.address2 ||
      !values.address3
    ) {
      errors = "Please fill all the fields.";
    }

    return errors;
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = validate(state);
    if (err.length > 0) {
      setFormErrors(err);
    } else {
      setFormErrors(err);
      if ((userId && !areSameObjects(personalInfo, state)) || canRetry) {
        dispatch(updateInfo(state, 0));
      } else if (!areSameObjects(personalInfo, state)) {
        dispatch(setPersonalInformation(state));
      } else {
        handleNext();
      }
    }
  };
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <div className="info">
        <div></div>
        <div className="form-fields">
          <span className="error">{formErrors}</span>
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={state.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                value={state.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="field">
              <label>Mobile Number</label>
              <input
                type="number"
                value={state.mob}
                onChange={handleChange}
                name="mob"
              />
            </div>
            <div className="field">
              <label>Address Line 1</label>
              <input
                type="text"
                value={state.address1}
                onChange={handleChange}
                name="address1"
              />
            </div>
            <div className="field">
              <label>Address Line 2</label>
              <input
                type="text"
                value={state.address2}
                onChange={handleChange}
                name="address2"
              />
            </div>
            <div className="field">
              <label>Address Line 3</label>
              <input
                type="text"
                value={state.address3}
                onChange={handleChange}
                name="address3"
              />
            </div>
          </form>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{ backgroundColor: isLoading ? "grey" : "red" }}
          >
            {isLoading ? (
              <>
                <CircularProgress color="inherit" size={10} /> Loading ..
              </>
            ) : canRetry ? (
              "Retry"
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </Slide>
  );
}

export default FormPersonalInfo;
