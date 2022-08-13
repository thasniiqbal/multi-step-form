import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import Slide from "@mui/material/Slide";
import { CircularProgress } from "@mui/material";

import SignatureDialog from "./signature/SignatureDialog";
import WebCamDialog from "./webcam/WebCamDialog";
import SuccessModal from "./Success";

import { updateInfo } from "./store/userFormSlice";

function Confirm({ handleBack }) {
  const dispatch = useDispatch();
  const {
    officeDetails: {
      buildingName,
      city,
      landlineNumber,
      POBoxNumber,
      officeaddress1,
      officeaddress2,
    },
    personalInfo: { name, mob, email, address1, address2, address3 },
    isLoading,
    canRetry,
    success,
  } = useSelector((state) => state.userForm);

  const [file, setFile] = useState("");
  const [sign, setSign] = useState("");
  const [openWeb, setOpenWeb] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const [formErrors, setFormErrors] = useState("");

  const imgFilehandler = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const validate = () => {
    let errors = "";
    if (!file) {
      errors = "Please add your picture.";
    } else if (!sign) {
      errors = "Please add your signature.";
    }

    return errors;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err.length > 0) {
      setFormErrors(err);
    } else {
      setFormErrors(err);
      dispatch(updateInfo({ profilePicture: file, signature: sign }, 2));
    }
  };

  return (
    <>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <div className="confirm-page">
          <span className="error" style={{ alignSelf: "center" }}>
            {formErrors}
          </span>
          <div className="confirm-content">
            <div>
              <div className="group">
                <label>Name</label>
                <p className="value">{name}</p>
              </div>
              <div className="group">
                <label>Email</label>
                <p className="value">{email}</p>
              </div>
              <div className="group">
                <label>Mobile Number</label>
                <p className="value">{mob}</p>
              </div>
              <div className="group">
                <label>Address Line 1</label>
                <p className="value">{address1}</p>
              </div>
              <div className="group">
                <label>Address Line 2</label>
                <p className="value">{address2}</p>
              </div>
              <div className="group">
                <label>Address Line 3</label>
                <p className="value">{address3}</p>
              </div>
            </div>
            <div>
              <div className="group">
                <label>Building Name</label>
                <p className="value">{buildingName}</p>
              </div>
              <div className="group">
                <label>City/Area</label>
                <p className="value">{city}</p>
              </div>
              <div className="group">
                <label>Landline Number</label>
                <p className="value">{landlineNumber}</p>
              </div>
              <div className="group">
                <label>Address Line 1</label>
                <p className="value">{officeaddress1}</p>
              </div>
              <div className="group">
                <label>Address Line 2</label>
                <p className="value">{officeaddress2}</p>
              </div>
              <div className="group">
                <label>PO Box Number</label>
                <p className="value">{POBoxNumber}</p>
              </div>
            </div>
            <div className="profile-and-signature">
              <div className="extra-content">
                <img
                  src={
                    file !== "" ? file : "/assets/images/user-dashed-icon.png"
                  }
                  alt=""
                />
                <div className="upload">
                  <IconButton
                    aria-label="upload picture"
                    component="label"
                    size="large"
                    onClick={() => setOpenWeb(true)}
                  >
                    <PhotoCamera />
                  </IconButton>
                  <IconButton
                    aria-label="upload picture"
                    component="label"
                    size="large"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={imgFilehandler}
                    />
                    <FolderOpenOutlinedIcon />
                  </IconButton>
                </div>
              </div>
              <div
                className="extra-content signature"
                onClick={() => setOpenSignature(true)}
              >
                {sign ? <img src={sign} alt="" /> : <label>Signature</label>}
              </div>
            </div>
          </div>
          <div className="actions">
            <button className="grey" onClick={handleBack}>
              Back
            </button>

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
                "Submit"
              )}
            </button>
          </div>
        </div>
      </Slide>

      <WebCamDialog
        open={openWeb}
        handleClose={() => setOpenWeb(false)}
        setImage={(img) => setFile(img)}
      />
      <SignatureDialog
        open={openSignature}
        handleClose={() => setOpenSignature(false)}
        setImage={(sign) => setSign(sign)}
      />

      {success && <SuccessModal />}
    </>
  );
}

export default Confirm;
