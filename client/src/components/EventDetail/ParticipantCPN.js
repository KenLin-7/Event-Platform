import React, {useEffect, useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Avatar, Chip} from "@mui/material";
import img from "./xxxxxxxx.png"

export default function ParticipantCPN() {

    return(
            <Grid2>
                <Chip
                    avatar={<Avatar sx={{width: 50, height: 50}} src={img} alt="User Name"/>}
                    label="User name"
                    variant="outlined"
                    size="medium"
                />
            </Grid2>

    );


}