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
    legData1 = (
      <div className="optionContainer">
        <h2 className="optionHeading">Option A: (Total Trip Time: 19.71 hrs)</h2>
        <p>Los Angeles 5:00AM</p>
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
        <h2 className="optionHeading">Option B: (Total Trip Time: 21.80 hrs)</h2>
        <p>Los Angeles 5:00AM</p>
        <p>Bakersfield 9:14AM ({(legData2Arr[0].time / 3600).toFixed(2)}hrs)</p>
        <p>
          San Francisco 2:08PM ({(legData2Arr[1].time / 3600).toFixed(2)}hrs)
        </p>
        <p>Medford 5:04PM ({(legData2Arr[2].time / 3600).toFixed(2)}hrs)</p>
        <p>Portland 11:21PM ({(legData2Arr[3].time / 3600).toFixed(2)}hrs)</p>
      </div>
    );
  }
  if (legData3Payload) {
    const legData3Arr = legData3Payload.legs;
    legData3 = (
      <div className="optionContainer">
        <h2 className="optionHeading">Option C: (Total Trip Time: 20.47 hrs)</h2>
        <p>Los Angeles 5:00AM</p>
        <p>San Jose 10:24AM ({(legData3Arr[0].time / 3600).toFixed(2)}hrs)</p>
        <p>
          Redding 4:42PM ({(legData3Arr[1].time / 3600).toFixed(2)}hrs)
        </p>
        <p>Eugene 10:44PM ({(legData3Arr[2].time / 3600).toFixed(2)}hrs)</p>
        <p>Portland 1:56AM ({(legData3Arr[3].time / 3600).toFixed(2)}hrs)</p>
      </div>
    );
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
            label={legData1}
            className={classes.formControl}
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label={legData2}
            className={classes.formControl}
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label={legData3}
            className={classes.formControl}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
