import React from "react";
import Typography from "@material-ui/core/Typography";

export default function RouteOptionLabel ({optionVal}){
    return (
        <Typography variant="h2" component="span" gutterBottom>
            {optionVal}
        </Typography>
    )
}