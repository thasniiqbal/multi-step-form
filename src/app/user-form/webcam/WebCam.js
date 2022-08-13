import React, { useEffect, useRef, useState } from "react";

import CameraIcon from "@mui/icons-material/Camera";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import "./styles.css";

function WebCam({ setImage, handleClose }) {
  const [profile, setProfile] = useState("");
  let videoRef = useRef(null);

  let photoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      });
  };

  const takePicture = () => {
    const width = 400;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;

    photo.getContext("2d").drawImage(video, 0, 0, width, height);
    let image_data_url = photo.toDataURL("image/jpeg");
    setProfile(image_data_url);
  };

  const handleSubmit = () => {
    setImage(profile);
    handleClose();
  };

  return (
    <div className="cam-container">
      <div>
        <video ref={videoRef} className="cam"></video>
        <div className="actions">
          <IconButton onClick={takePicture} sx={{ color: "red" }}>
            <CameraIcon fontSize="large" />
          </IconButton>

          <Button size="small" variant="outlined" onClick={handleSubmit}>
            Upload
          </Button>
        </div>
      </div>
      <canvas className="canvas" ref={photoRef}></canvas>
    </div>
  );
}

export default WebCam;
