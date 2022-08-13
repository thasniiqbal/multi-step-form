import * as React from "react";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import WebCam from "./WebCam";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WebCamDialog(prop) {
  const { open, handleClose } = prop;
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {open && <WebCam {...prop} />}
      </Dialog>
    </div>
  );
}
