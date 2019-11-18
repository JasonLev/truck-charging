import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useLocation } from 'react-router-dom';

import useMapImage from '../hooks/useMapImage'
import ChoiceForm from "./ChoiceForm";
import SwitchForm from "./SwitchForm";

import navIcons from '../images/Material_Icons.png'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1),
    height: "90vh",
    overflowY: "scroll"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Map() {
  const location = useLocation();
  let startImg = 1
  if (location.pathname === '/map_traffic') {
    startImg = 4;
  }
  
  const [urlParam, setUrlParam] = useState(startImg);
  const [isShowingForm, setShowingForm] = useState(true);
  const [isShowingSwitchForm, setShowingSwitchForm] = useState(true);
  const [isShowingConfirm, setShowingConfirm] = useState(false);
  const [isConfirmed, setConfirmed] = useState(false);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const mapImg = useMapImage(urlParam);
  
  let mapContainer;
  if (mapImg) {
    mapContainer = (
        <img src={mapImg} alt="map" className="mapImg" />
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
    setShowingSwitchForm(false);
    setConfirmed(true);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  
  const renderForm = () => (
    isShowingForm && <ChoiceForm onFormChange={handleFormChange} />        
  )
  const renderSwitchForm = () => (
    isShowingSwitchForm && <SwitchForm onSwitchFormChange={handleFormChange} />        
  )
  const optionLabels = ["A", "B", "C"];

  return (
    <Paper className={classes.root}>
      <Link to="/map_traffic">
        <img src={navIcons} alt="icons" className="navIcons" />
      </Link>
      <Typography variant="h2" component="h2" gutterBottom>
        {isConfirmed ? "Confirmed Route" : "Your Map"}
      </Typography>

      <div className="mapMain">
        {mapContainer}
        <div>
          {location.pathname === "/map" ? renderForm() : renderSwitchForm()}
          {isShowingConfirm && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleConfirm}
            >
              <span className="confirmBtn">Confirm</span>
              {location.pathname === "/map" ? (
                `Option ${optionLabels[urlParam - 1]}`
              ) : urlParam === "4" ? (
                <span>Stay current route</span>
              ) : (
                <span>Switch to Other Route</span>
              )}
            </Button>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {location.pathname === "/map"
            ? "Your 9:15am reservation has been confirmed!"
            : "Your reservation has been updated to the new location and time!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Payment will be processed with your digital wallet.</p>
            <p>
              Please be aware route changes may be suggested during heavy
              traffic.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
