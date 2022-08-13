import React, { useRef } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import SignatureCanvas from "react-signature-canvas";

function Signature({ setImage, handleClose }) {
  const sigCanvas = useRef({});

  const clear = () => {
    sigCanvas.current.clear();
    setImage("");
  };

  const save = () => {
    setImage(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    handleClose();
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 400, height: 300 }}
      />
      <div className="actions">
        <Button variant="outlined" onClick={save}>
          Save
        </Button>
        <IconButton aria-label="delete" onClick={clear}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Signature;
