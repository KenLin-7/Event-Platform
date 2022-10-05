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
import styles from '../../asserts/stylesheet/Profile.module.css'

export default function SiderBar() {
  return (
    
    <Box sx={{ display: 'flex', pt:10,}}>
        <Drawer sx={{backgroundColor: '#cfd8dc', width: 240,flexShrink: 0,'& .MuiDrawer-paper': {width: 240,boxSizing: 'border-box', position: 'relative', borderRignt: 1, },}}variant="permanent"anchor="left">
            <List style={{ flexDirection: 'row', padding: 0, display:"inline-block" }}>
                <ListItem disablePadding>
                <ListItemButton component={Link} to="/profile" sx={{pb:2,pt:2}}>
                    <ListItemIcon><PermIdentityIcon/></ListItemIcon>
                    <ListItemText>Account Information</ListItemText>
                </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/password" sx={{pb:2,pt:2}}>
                        <ListItemIcon><PasswordIcon /></ListItemIcon>
                        <ListItemText>Password</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    </Box>
  );
}
