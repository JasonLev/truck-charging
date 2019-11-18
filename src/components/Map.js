import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useLocation } from 'react-router-dom';

import useMapImage from '../hooks/useMapImage'
import ChoiceForm from "./ChoiceForm";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1),
    height: "90vh",
    overflowY: "scroll"
  },
  mapContainer: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1),
    // height: "55vh",
    overflowY: "scroll"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Map() {
  const [urlParam, setUrlParam] = useState(1);
  const [isShowingForm, setShowingForm] = useState(true);
  const [isShowingConfirm, setShowingConfirm] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false);
  const classes = useStyles();
  const mapImg = useMapImage(urlParam);
  
  let mapContainer;
  if (mapImg) {
    mapContainer = (
      <Container maxWidth="sm">
        <img src={mapImg} alt="map" />
      </Container>
    );
  } else {
    mapContainer = "Loading map...";
  }

  const handleFormChange = (selection) => {
    setUrlParam(selection)
    setShowingConfirm(true);
  }
  const handleConfirm = (selection) => {
    setShowingForm(false);
    setShowingConfirm(false);
    setConfirmed(true);
  }
  
  const location = useLocation();
  const renderForm = () => (
    isShowingForm && <ChoiceForm onFormChange={handleFormChange} />        
  )
  return (
    <Paper className={classes.root}>
      <Typography variant="h2" component="h2" gutterBottom>
        {isConfirmed ? "Confirmed Route" : "Your Map"}
      </Typography>

      <div className={classes.mapContainer}>{mapContainer}</div>
      {location.pathname === "/map" && renderForm()}
      {isShowingConfirm && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleConfirm}
        >
          Confirm{" "}
          {location.pathname === "/map"
            ? `Option ${urlParam}`
            : `Switch to Other Option`}
        </Button>
      )}
    </Paper>
  );
}
