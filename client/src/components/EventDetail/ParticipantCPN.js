import React, {useEffect, useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Avatar, Chip} from "@mui/material";
import img from "./xxxxxxxx.png"

export default function ParticipantCPN(props) {

    return(
            <Grid2>
                <Chip
                    avatar={<Avatar sx={{width: 50, height: 50}} src={img} alt="User Name"/>}
                    label={props.requester.nickname}
                    variant="outlined"
                    size="medium"
                />
            </Grid2>

    );


}