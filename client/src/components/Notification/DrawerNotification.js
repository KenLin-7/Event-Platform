import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import CloseIcon from "@mui/icons-material/Close";

import MessageNotification from "./MessageNotification";
import { IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useNotification } from "../../context/NotificationContext";
import icon from '../../asserts/images/icon/icon_not_data_1.png'

export default function DrawerNotification(props) {
  const { notifications, clearAll } = useNotification();

  useEffect(() => {}, [notifications]);

  return (
    <Drawer
      open={props.open}
      anchor={"right"}
      onClose={props.toggleDrawer}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box role="presentation" minWidth={'350px'}>
        <Stack
          alignItems={"flex-end"}
          sx={{ marginLeft: "20px" }}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Notification</Typography>
          <IconButton onClick={props.toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack
          flexDirection="row"
          justifyContent={"flex-end"}
          sx={{
            marginRight: "10px",
            cursor: "pointer",
            ":hover": { textDecoration: "underline" },
          }}
        >
          <ClearAllIcon />
          <Typography onClick={clearAll}>clear all</Typography>
        </Stack>
        <Divider />
        {notifications.length === 0 ? (
          <Stack justifyContent={'center'} alignItems={'center'} sx={{height:'100%'}}>
            <img src={icon} width="40px" height={"40px"}/>
            <Typography color={'#CCCCCC'} variant="h6">No message</Typography>
          </Stack>
        ) : (
          <List>
            {notifications.map((message, index) => (
              <div key={index}>
                <ListItem disablePadding>
                  <MessageNotification notification={message} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
}
