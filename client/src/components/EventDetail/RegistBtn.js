import {Button} from "@mui/material";
import React from "@types/react";


export default function RegistBtn(props) {


    if (props.pendFlag) {
        if (props.pendingFlag) {

            return (<Button disabled fullWidth align={'center'} sx={{marginY: 3}}
                            variant="contained" size="large">
                    pending</Button>
            )
        } else {
            return (<Button onClick={onPendClick} fullWidth align={'center'} sx={{marginY: 3}}
                            variant="contained" size="large">

                Regist Now</Button>)
        }

        return (<Button disabled fullWidth align={'center'} sx={{marginY: 3}}
                        variant="contained" size="large">

            Full</Button>)


    } else {
        return <></>
    }


}