import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  // root: {
  //   padding: theme.spacing(3, 2),
  //   margin: theme.spacing(1),
  //   height: "90vh",
  //   overflowY: "scroll"
  // },
  // mapContainer: {
  //   padding: theme.spacing(3, 2),
  //   margin: theme.spacing(1),
  //   // height: "55vh",
  //   overflowY: "scroll"
  // },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Welcome() {
  const classes = useStyles();

  return (
    <div className="landing">
      {/*<img src={ChargeLogoLanding} alt="charge logo"/>*/}
      <Button variant="contained" color="primary" className={classes.button}>
        <Link to="/dashboard" className="landingBtn">
          Login Here
        </Link>
      </Button>
    </div>
  );
}
