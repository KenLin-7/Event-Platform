import {Button, Dialog, DialogActions, DialogContent, Stack} from "@mui/material";
import React, {useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import {createRegistration, deleteRegistration} from "../../api/RegistrationAPI";
import { useNotification } from "../../context/NotificationContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
export default function RegistBtn(props) {

    const [openConfirmed, setOpenConfirmed] = useState(false);
    const [openPending, setOpenPending] = useState(false);
    const {sendUserMessage,subscribeEvent} = useNotification()
    const {auth} = useUser()
    const navigate = useNavigate()
    const handleClosePending = () => {
        setOpenPending(false);
    };


    const handleCloseConfirmed = () => {
        setOpenConfirmed(false);
    };


    //  Add notification registre info ------------ add owner email 
    const onRigstClick = () => {
    if(auth){
        createRegistration(props.eventId).then(res=>{
            if(res.code==="200"){
                sendUserMessage("kenlbd61@gmail.com",props.eventId,"Some one have registred your event")
            }
        })
        props.updateRegistFlag("pending")
    }else{
        navigate("/login")
    }
    }


    const onPendingClick = () => {
        setOpenPending(true)
    }

    const onConfirmedClick = () => {
        setOpenConfirmed(true)
    }

    // TODO add owner email -----  send after confirmed cancel info
    const onConfirmedYesClick = () => {
        setOpenConfirmed(false)
        deleteRegistration(props.eventId).then(res=>{
            if(res.code==="200"){
                props.updateRegistFlag("available")
                subscribeEvent(props.eventId)
                sendUserMessage("kenlbd61@gmail.com",props.eventId,"Some one have left your event")
            }
        })

    }


    const onPendingYesClick = () => {
        deleteRegistration(props.eventId)
        setOpenPending(false)
        props.updateRegistFlag("available")

    }

    const flag = props.registFlag
    switch (flag) {

        case "owner":
            return (
                <Stack sx={{marginBottom: 4}}></Stack>)
            break

        case "available":
            return (

                <Button onClick={onRigstClick} fullWidth align={'center'} sx={{marginY: 3}}
                        variant="contained" size="large">

                    Regist Now</Button>)

            break

        case "pending":

            return (
                <div>
                    <Button onClick={onPendingClick} fullWidth align={'center'} sx={{marginY: 3}}
                            variant="contained" size="large">
                        pending</Button>
                    <Dialog
                        open={openPending}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {""}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Do you want to cancel registration?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClosePending}>No</Button>
                            <Button onClick={onPendingYesClick} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
            break

        case "confirmed":
            return (
                <div>
                    <Button color={"error"} onClick={onConfirmedClick} fullWidth align={'center'} sx={{marginY: 3}}
                            variant="contained" size="large">
                        leave event</Button>
                    <Dialog
                        open={openConfirmed}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {""}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Do you want to leave the event?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseConfirmed}>No</Button>
                            <Button onClick={onConfirmedYesClick} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
            break

        case "rejected":
            return (<Button color={"error"} disabled fullWidth align={'center'} sx={{marginY: 3}}
                            variant="contained" size="large">

                Rejected</Button>)


            break

        case "full":
            return (<Button disabled fullWidth align={'center'} sx={{marginY: 3}}
                            variant="contained" size="large">

                Full</Button>)

        default:
            return <></>

    }


}