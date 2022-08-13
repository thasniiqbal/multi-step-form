import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import Slide from "@mui/material/Slide";

import { updateInfo } from "./store/userFormSlice";
import { areSameObjects } from "../../utils";

function FormOfficeDetails({ handleNext }) {
  const { officeDetails, isLoading, canRetry } = useSelector(
    (state) => state.userForm
  );

  const dispatch = useDispatch();
  const {
    buildingName,
    city,
    landlineNumber,
    officeaddress1,
    officeaddress2,
    POBoxNumber,
  } = officeDetails;

  const [state, setState] = useState({
    buildingName,
    city,
    landlineNumber,
    officeaddress1,
    officeaddress2,
    POBoxNumber,
  });
  const [formErrors, setFormErrors] = useState("");

  const validate = (values) => {
    let errors = "";

    if (
      !values.buildingName ||
      !values.city ||
      !values.officeaddress1 ||
      !values.officeaddress2 ||
      !values.landlineNumber ||
      !values.POBoxNumber
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
      if (!areSameObjects(officeDetails, state) || canRetry) {
        dispatch(updateInfo(state, 1));
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
              <label>Building Name</label>
              <input
                type="text"
                value={state.buildingName}
                onChange={handleChange}
                name="buildingName"
              />
            </div>
            <div className="field">
              <label>City/Area</label>
              <input
                type="text"
                value={state.city}
                onChange={handleChange}
                name="city"
              />
            </div>
            <div className="field">
              <label>Landline Number</label>
              <input
                type="number"
                value={state.landlineNumber}
                onChange={handleChange}
                name="landlineNumber"
              />
            </div>
            <div className="field">
              <label>Address Line 1</label>
              <input
                type="text"
                value={state.officeaddress1}
                onChange={handleChange}
                name="officeaddress1"
              />
            </div>
            <div className="field">
              <label>Address Line 2</label>
              <input
                type="text"
                value={state.officeaddress2}
                onChange={handleChange}
                name="officeaddress2"
              />
            </div>
            <div className="field">
              <label>PO Box Number</label>
              <input
                type="number"
                value={state.POBoxNumber}
                onChange={handleChange}
                name="POBoxNumber"
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

export default FormOfficeDetails;
