import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { Stack } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../asserts/stylesheet/Header.module.css'
import { useUser } from '../context/UserContext';
import logo from '../asserts/images/logo3.png'

const items = [
  { id: 1, text: 'Latest event' },
  { id: 2, text: 'Search' },
  { id: 3, text: 'Community' },
  { id: 4, text: 'About us' },
];


const Header = () => {

  const {auth,signOut} = useUser();



  return (
    <div className={styles["header-container"]}>
      <Container maxWidth="xl" sx={{ display: "flex", padding: 3 }}>

        <Box className={styles["left"]}>
          <Stack direction="row" spacing={2}>
            <img src={logo}/>
            <Typography className={styles["header-logo-font"]}>
              Event Plaza
            </Typography>
          </Stack>
        </Box>

        <div className={styles["mid"]}>
          {
            items.map(item => {
              return (
                <Button key={item.id} className={styles["header-mid-btn"]}>
                  <Typography className="header-font" sx={{ color: 'black', fontSize: 'small' }}>
                    {item.text}
                  </Typography>
                </Button>
              )
            })
          }
        </div>

        <div className={styles["right"]}>
          {auth === null?(            
          <Stack className={styles["right-stack"]} direction="row" spacing={2}>
            <Link to="/login"><Button variant="outlined" sx={{ borderRadius: 8 }} className="header-btn">Sign in</Button></Link>
            <Link to="/register"><Button variant="contained" sx={{ borderRadius: 8 }} className="header-btn">Register</Button></Link>
          </Stack>):(
          <Stack className={styles["right-stack"]} direction="row" spacing={2}>
            <Button variant="outlined" sx={{ borderRadius: 8 }} onClick={signOut} className="header-btn">Log out</Button>
          </Stack>
          )
          }
 
        </div>


      </Container>
    </div>
  )
}

export default Header