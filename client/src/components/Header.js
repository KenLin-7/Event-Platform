import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';

import '../asserts/stylesheet/header.css'

const items = [
  { id: 1, text: 'Latest event' },
  { id: 2, text: 'Search' },
  { id: 3, text: 'Community' },
  { id: 4, text: 'About us' },
];

const Header = () => {
  return (
    <div className="header-container">
      <Container maxWidth="xl" sx={{ display: "flex", marginTop: 3 }}>

        <Box className="left">
          <Stack direction="row" spacing={2}>
            <AdbIcon />
            <Typography className="header-logo-font">
              Event Plaza
            </Typography>
          </Stack>
        </Box>

        <div className='mid'>
          {
            items.map(item => {
              return (
                <Button key={item.id} className="header-mid-btn">
                  <Typography className="header-font" sx={{ color: 'black', fontSize: 'small' }}>
                    {item.text}
                  </Typography>
                </Button>
              )
            })
          }
        </div>

        <div className="right">
          <Stack className="right-stack" direction="row" spacing={2}>
            <Button variant="outlined" sx={{ borderRadius: 8 }} className="header-btn">Sign in</Button>
            <Button variant="contained" sx={{ borderRadius: 8 }} className="header-btn">Register</Button>
          </Stack>
        </div>


      </Container>
    </div>
  )
}

export default Header