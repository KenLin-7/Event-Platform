import React,{useEffect} from 'react'
import {useSnackbar} from 'notistack' 
import { useNotification } from '../context/NotificationContext';

export default function Notification() {
    const { enqueueSnackbar } = useSnackbar();
    const {currentNotification,setCurrentNotification} = useNotification()

    useEffect(()=>{
        if(currentNotification!="") {
            enqueueSnackbar(currentNotification,{variant:'success'})
            setCurrentNotification("")
        }
    },[currentNotification])
  
    return (
     <></>
    );
}
