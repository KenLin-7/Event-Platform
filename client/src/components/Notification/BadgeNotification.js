import { IconButton,Badge } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DrawerNotification from './DrawerNotification';
import { getCount } from '../../api/NotificationAPI';


export default function BadgeNotification() {
  const[open,setOpen] = useState(false)
  const [total,setTotal] = useState(0)

  useEffect(()=>{
     function count(){
       getCount().then(data=>{
          setTotal(data)
       })
     }
     count()
  },[])
  
  const toggleDrawer = ()=>{
    setOpen(!open)
  }
  
    return (
    <IconButton onClick={toggleDrawer}>
        <Badge  badgeContent={total} color="primary">
           <NotificationsRoundedIcon/> 
        </Badge>
        <DrawerNotification toggleDrawer={toggleDrawer} open={open} />
    </IconButton>
  )
}

