import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import Signature from "./Signature";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignatureDialog(prop) {
  const { open, handleClose } = prop;
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <Signature {...prop} />
      </Dialog>
    </div>
  );
}
