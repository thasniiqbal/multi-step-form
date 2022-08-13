import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

import "./styles.css";

export const Header = () => {
  return (
    <div className="header">
      <h5>USER</h5>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
};
