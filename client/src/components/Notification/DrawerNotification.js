import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MessageNotification from './MessageNotification';
import { Typography } from '@mui/material';

 const Notification = [
  {
    message: "Test 1 ",
    craetedTime: "2020-10-01 10:00:00"
  },
  {
    message: "Test 1 ",
    craetedTime: "2020-10-01 10:00:00"
  }
  ,  {
    message: "Test 1 ",
    craetedTime: "2020-10-01 10:00:00"
  }
 ]

export default function DrawerNotification(props) {


  return (
    <Drawer 
      open={props.open}
      anchor={'right'}
      onClose={props.toggleDrawer}
      >
        <Box
          role="presentation"
          // onKeyDown={props.toggleDrawer}
        >
          <Typography variant='h4'>Notification</Typography>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                  <MessageNotification/>
                  
              </ListItem>
            ))}
          </List>
      </Box>
    </Drawer>
  )
}
