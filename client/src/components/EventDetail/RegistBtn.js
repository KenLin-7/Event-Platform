import {Button} from "@mui/material";
import React from "react";


export default function RegistBtn(props) {

    const flag=props.registFlag
    switch (flag){

        case "available":
            return (<Button fullWidth align={'center'} sx={{marginY: 3}}
                            variant="contained" size="large">

                Regist Now</Button>)

        break

        case "pending":
            return (<Button disabled fullWidth align={'center'} sx={{marginY: 3}}
                            variant="contained" size="large">
                    pending</Button>
            )
            break

        case "confirmed":
            break

        case "rejected":

            break

        case "full":
            return (<Button disabled fullWidth align={'center'} sx={{marginY: 3}}
                            variant="contained" size="large">

                Full</Button>)

        default: return <></>

    }













}