import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import Dialog from "@mui/material/Dialog";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";

import { resetRedux } from "./store/userFormSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom direction="" ref={ref} {...props} />;
});

export default function SuccessModal() {
  const dispatch = useDispatch();
  const { success, userId } = useSelector((state) => state.userForm);

  const handleClose = () => {};

  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#F4F5F5",
          },
        }}
        fullScreen
        open={success}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className="success-content">
          <img src="./assets/images/success.png" alt="" />
          <h1>Success</h1>
          <span> Reference number #{userId}</span>
          <h3>Your Application has been submitted .</h3>

          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{ padding: "10px 45px" }}
            onClick={() => dispatch(resetRedux())}
          >
            OK
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
