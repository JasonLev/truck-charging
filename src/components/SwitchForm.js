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
    legData1 = (
      <div className="optionContainer">
        <h2 className="optionHeading heavyTraffic">
          Current Route: (Total Trip Time: 19.71 hrs)
        </h2>
        <p className="strike">Los Angeles 5:00AM</p>
        <p>San Jose 10:24AM ({(legData1Arr[0].time / 3600).toFixed(2)}hrs)</p>
        <p>Medford 4:08PM ({(legData1Arr[1].time / 3600).toFixed(2)}hrs)</p>
        <p>Portland 10:52PM ({(legData1Arr[2].time / 3600).toFixed(2)}hrs)</p>
      </div>
    );
  }
  if (legData2Payload) {
    const legData2Arr = legData2Payload.legs;
    legData2 = (
      <div className="optionContainer">
        <h2 className="optionHeading heavyTraffic">
          Alternate Route: (Total Trip Time: 25.09 hrs)
        </h2>
        <p className="strike">Los Angeles 5:00AM</p>
        <p>San Jose 10:24AM (5.40hrs</p>
        <p>Carson City 4:42PM (5.48hrs)</p>
        <p>Klamath Falls 11:35PM (8.35hrs)</p>
        <p>Portland 4:56AM (5.86hrs)</p>
      </div>
    );
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
            label={legData1}
            className={classes.formControl}
          />
          <FormControlLabel
            value="5"
            control={<Radio />}
            label={legData2}
            className={classes.formControl}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
