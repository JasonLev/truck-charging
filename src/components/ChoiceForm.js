import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import useLegTimes from "../hooks/useLegTimeData";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1, 0)
  },
  formControlLabel: {
    margin: theme.spacing(3)
  },
}));

export default function ChoiceForm({ onFormChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  const legData1Payload = useLegTimes(2);
  const legData2Payload = useLegTimes(1);
  const legData3Payload = useLegTimes(3);
  let legData1 = "Loading..."
  let legData2 = "Loading..."
  let legData3 = "Loading..."
  if (legData1Payload) {
    const legData1Arr = legData1Payload.legs;
    const temp1 = [];
    legData1Arr.forEach(item => temp1.push((item.time / 3600).toFixed(2)))
    legData1 = temp1.join(" hr --> ") + " hr (Recommended)";
  }
  if (legData2Payload) {
    const legData2Arr = legData2Payload.legs;
    const temp2 = [];
    legData2Arr.forEach(item => temp2.push((item.time / 3600).toFixed(2)))
    legData2 = temp2.join(" hr --> ") + " hr";
  }
  if (legData3Payload) {
    const legData3Arr = legData3Payload.legs;
    const temp3 = [];
    legData3Arr.forEach(item => temp3.push((item.time / 3600).toFixed(2)))
    legData3 = temp3.join(" hr --> ") + " hr";
  }
  
  const handleChange = event => {
    setValue(event.target.value);
    onFormChange(event.target.value);
  };
  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Route Options & Recharging Stations</FormLabel>
        <RadioGroup
          aria-label="routes"
          name="routes"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label={`Option A: ${legData1}`}
            className={classes.formControl}
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label={`Option B: ${legData2}`}
            className={classes.formControl}
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label={`Option C: ${legData3}`}
            className={classes.formControl}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
