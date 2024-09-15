import React from "react";
import { Paper, Typography } from "@mui/material";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white", // Change color of the die once held
    cursor: "pointer",
    padding: "10px",
    textAlign: "center",
    borderRadius: "8px",
    margin: "5px",
    minWidth: "50px",
  };

  return (
    <Paper elevation={3} style={styles} onClick={props.holdDice}>
      <Typography variant="h5">{props.value}</Typography>
    </Paper>
  );
}