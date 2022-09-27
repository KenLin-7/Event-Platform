import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PasswordIcon from '@mui/icons-material/Password';
import { Link} from 'react-router-dom';

export default function SiderBar() {
const drawerWidth = 240;
  return (
    <Box sx={{ display: 'flex' }}>
        <Drawer sx={{width: drawerWidth,flexShrink: 0,'& .MuiDrawer-paper': {width: drawerWidth,boxSizing: 'border-box',},}}variant="permanent"anchor="left">
            <Toolbar />
            <List style={{ flexDirection: 'row', padding: 0, display:"inline-block" }}>
                <ListItem disablePadding>
                <ListItemButton component={Link} to="/profile">
                    <ListItemIcon><PermIdentityIcon/></ListItemIcon>
                    <ListItemText>My Account</ListItemText>
                </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/password">
                        <ListItemIcon><PasswordIcon /></ListItemIcon>
                        <ListItemText>Password</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    </Box>
  );
}
