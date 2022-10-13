import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Stack } from '@mui/system';
import { Button, Typography,Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../asserts/stylesheet/Header.module.css'
import { useUser } from '../context/UserContext';
import logo from '../asserts/images/logo3.png'
import { useNotification } from '../context/NotificationContext';
import BadgeNotification from './Notification/BadgeNotification';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";




const Header = () => {

  const {auth,signOut} = useUser();
  const {disconnect} = useNotification();
  const navigate = useNavigate();


  const logout = ()=>{
    signOut()
    disconnect()
    navigate("/")

  }

  return (
    <div className={styles["header-container"]}>
      <Container sx={{ display: "flex", padding: 3 }} className={styles["header-container-inner"]}>
      <Link to="/">
        <Box className={styles["left"]}>
          <Stack direction="row" spacing={2}>
            <img src={logo}/>
            <Typography className={styles["header-logo-font"]}>
              Event Plaza
            </Typography>
          </Stack>
        </Box>
      </Link>
        <div className={styles["mid"]}>

        </div>

        <div className={styles["right"]}>
          {auth === null?(            
          <Stack className={styles["right-stack"]} direction="row" spacing={2}>
            <Link to="/login"><Button variant="outlined" sx={{ borderRadius: 2, minWidth: 100 }} className="header-btn">Sign in</Button></Link>
            <Link to="/register"><Button variant="contained" sx={{ borderRadius: 2 }} className="header-btn">Register</Button></Link>
          </Stack>):(
            <Stack direction="row" spacing={2}>
                            <BadgeNotification/>

              <Stack direction={"row"} spacing={1} sx={{ marginRight: 5 }}>
                <div className={styles['dropdown']}>
                  <Stack direction={"row"}>
                    <Avatar sx={{ width: 40, height: 40 }} src="" />
                    <KeyboardArrowDownIcon sx={{marginTop: 1.5, marginLeft:0.4, fontSize: 18}}/>
                  </Stack>

                  <div className={styles["dropdown-content"]}>
                    <a href='/eventpost'>Post event</a>
                    <a href="/user-page">View event</a>
                    <a href="/profile">Account setting</a>
                  </div>
                </div>
              </Stack>
              <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={logout} className="header-btn">Log out</Button>
            </Stack>

          )
          }
 
        </div>


      </Container>
    </div>
  )
}

export default Header