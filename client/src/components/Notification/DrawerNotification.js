import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';

import MessageNotification from './MessageNotification';
import { IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import ClearAllIcon from '@mui/icons-material/ClearAll';
 const Notification = [
  {
    message: "Your registration has been rejected",
    eventTitle: "Event Title",
    description:"dasdasdasdasd",
    craetedTime: "2020-10-01 10:00:00"
  },
  {
    message: "Your registration has been rejected",
    eventTitle: "Event Title",
    description:"dasdasdasdasd",
    craetedTime: "2020-10-01 10:00:00"
  }
  ,  {
    message: "Your registration has been rejected",
    eventTitle: "Event Title",
    description:"dasdasdasdasd",
    craetedTime: "2020-10-01 10:00:00"
  }
 ]

export default function DrawerNotification(props) {


  return (
    <Drawer 
      open={props.open}
      anchor={'right'}
      onClose={props.toggleDrawer}
      ModalProps={{
        keepMounted: true,
      }}
      >
        <Box
          role="presentation"
        >
          <Stack alignItems={"flex-end"} sx={{marginLeft:'20px'}} direction={"row"} justifyContent={"space-between"}>
            <Typography variant='h4' >Notification</Typography>
            <IconButton onClick={props.toggleDrawer}><CloseIcon/></IconButton>
          </Stack>
          <Stack flexDirection="row" sx={{marginLeft:'20px',cursor:'pointer',":hover":{textDecoration:'underline'}}}>
            <ClearAllIcon/>
            <Typography>clear all</Typography>
          </Stack>
          <Divider/>
          <List>
            {Notification.map((message, index) => (
              <div key={index} >
              <ListItem disablePadding>
                  <MessageNotification notification={message}/>
              </ListItem>
              <Divider/>
              </div>

            ))}
          </List>
      </Box>
    </Drawer>
  )
}
