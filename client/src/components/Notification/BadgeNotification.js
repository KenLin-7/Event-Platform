import { IconButton,Badge } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DrawerNotification from './DrawerNotification';
import { useNotification } from '../../context/NotificationContext';


export default function BadgeNotification() {
  const[open,setOpen] = useState(false)
  const[total,setTotal] = useState(0)
  const {count} = useNotification()

  useEffect(()=>{
    console.log(count);
     function getCount(){
        setTotal(count)
     }
     if(count >= 0){
      getCount()
     }

  },[count])
  
  const toggleDrawer = ()=>{
    if(!open){
      setOpen(true)
    }
  }

  const closeDrawer = ()=>{
    setOpen(false)
  }

  
    return (
    <IconButton onClick={toggleDrawer} >
        <Badge  badgeContent={total} color="primary">
           <NotificationsRoundedIcon/> 
        </Badge>
        <DrawerNotification toggleDrawer={closeDrawer} open={open} />
    </IconButton>
  )
}

