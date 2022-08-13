import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import FormPersonalInfo from "./FormPersonalInfo";
import FormOfficeDetails from "./FormOfficeDetails";
import Confirm from "./Confirm";

import { setPage, showErr } from "./store/userFormSlice";

import "./styles.css";

const steps = ["step 1", "step 2", "step 3"];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UserForm() {
  const dispatch = useDispatch();

  const { activePage, isError, errMessage } = useSelector(
    (state) => state.userForm
  );

  const [activeStep, setActiveStep] = useState(activePage);

  useEffect(() => {
    setActiveStep(activePage);
  }, [activePage]);

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
    dispatch(setPage(newActiveStep));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      dispatch(setPage(prevActiveStep - 1));
      return prevActiveStep - 1;
    });
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    dispatch(setPage(step));
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FormPersonalInfo handleNext={handleNext} />;
      case 1:
        return <FormOfficeDetails handleNext={handleNext} />;
      case 2:
        return <Confirm handleNext={handleNext} handleBack={handleBack} />;
      default:
        return;
    }
  }

  return (
    <div>
      <div className="header-text">
        <Typography variant="h6" color="GrayText">
          {activePage === 0
            ? "Personal Info"
            : activePage === 1
            ? "Office Details"
            : "Confirmation Page"}
        </Typography>
      </div>

      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step
            key={label}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "red",
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "grey.700",
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "red",
                border: "0.5px solid red",
                borderRadius: "50%",
                padding: "2px",
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: "grey.700",
                  border: "none",
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "white",
              },
              "& 	.MuiStepConnector-root .MuiStepConnector-line": {
                width: "70%",
                margin: "auto",
              },
            }}
          >
            <StepButton onClick={handleStep(index)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <div className="form-body">
          <div className="main">{getStepContent(activeStep)}</div>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isError}
            autoHideDuration={6000}
            onClose={() => dispatch(showErr({ flag: false, message: "" }))}
          >
            <Alert
              onClose={() => dispatch(showErr({ flag: false, message: "" }))}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}
