import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// import RouteOptionLabel from './RouteOptionLabel'
import useLegTimes from "../hooks/useLegTimeData";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  }
}));

export default function ChoiceForm({ onFormChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  const legData1Payload = useLegTimes(1);
  const legData2Payload = useLegTimes(2);
  const legData3Payload = useLegTimes(3);
  let legData1 = "Loading..."
  let legData2 = "Loading..."
  let legData3 = "Loading..."
  if (legData1Payload) {
    const legData1Arr = legData1Payload.legs;
    legData1 = legData1Arr.forEach(item => (item.time / 3600).toFixed(2))
    // reduce((acc, curr) => `${acc.time / 3600} hr` + `${curr.time / 3600} hr` )
  }
  
  
  const handleChange = event => {
    setValue(event.target.value);
    onFormChange(event.target.value);
  };
  // if (legTimes) {
  //   legTimes.legs.map(leg => console.log(leg))

  // }
  // const optionVals = ["A", "B", "C"];
  // const formControls = optionVals.map((optionVal, i) => {
  //   return <FormControlLabel key={i}
  //                            value={optionVal}
  //                            control={<Radio />}
  //                            label={<RouteOptionLabel optionVal={optionVal} />}
  //                            />
  // })
  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Route Options</FormLabel>
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
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label={`Option B: ${legData2}`}
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label={`Option C: ${legData3}`}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
