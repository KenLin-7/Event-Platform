import React from 'react'
import SiderBar from '../UserManagement/SiderBar'
import { HashRouter, Route, Routes } from "react-router-dom";
import NotFound from './NotFound'
import { Container, Stack } from '@mui/material';
import Profile from '../UserManagement/Profile';
import Password from '../UserManagement/Password';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';

export default function password(){
    const drawerWidth = 240;
    return (
      <Box sx={{ display: 'flex' }}>
      <SiderBar></SiderBar>
      <Box sx={{width:1, mt:3}}>
        <Typography variant="h6" noWrap component="div" sx={{display:'inline-block', width:1,height:40,}}>
              Password
        </Typography>

      </Box>
    </Box>
    );
}