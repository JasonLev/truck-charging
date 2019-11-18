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
    margin: theme.spacing(3)
  },
  formControlLabel: {
    margin: theme.spacing(3)
  }
}));

export default function SwitchForm({ onSwitchFormChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  const legData1Payload = useLegTimes(1);
  const legData2Payload = useLegTimes(2);
  let legData1 = "Loading...";
  let legData2 = "Loading...";
  if (legData1Payload) {
    const legData1Arr = legData1Payload.legs;
    const temp1 = [];
    legData1Arr.forEach(item => temp1.push((item.time / 3600).toFixed(2)));
    legData1 = temp1.join(" hr --> ") + " hr      Stay Current Route";
  }
  if (legData2Payload) {
    const legData2Arr = legData2Payload.legs;
    const temp2 = [];
    legData2Arr.forEach(item => temp2.push((item.time / 3600).toFixed(2)));
    legData2 = temp2.join(" hr --> ") + " hr (Recommended, Switch Route)";
  }
  const handleChange = event => {
    setValue(event.target.value);
    onSwitchFormChange(event.target.value);
  };
  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Switch Route Options</FormLabel>
        <RadioGroup
          aria-label="routes"
          name="routes"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="4"
            control={<Radio />}
            label={`Option A: ${legData1}`}
            className={classes.formControl}
          />
          <FormControlLabel
            value="5"
            control={<Radio />}
            label={`Option B: ${legData2}`}
            className={classes.formControl}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
