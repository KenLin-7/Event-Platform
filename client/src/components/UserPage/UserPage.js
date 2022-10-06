import React, { useEffect, useState } from 'react'
import styles from '../../asserts/stylesheet/UserPage/UserPage.module.css'
import {
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import ImageTest from '../../asserts/images/test-image.png'
import { getUserInfo } from '../../api/UserAPI'
import CircularProgress from '@mui/material/CircularProgress';
import UserRegistration from './UserRegistration'
import UserPost from './UserPost'
import ManageRegistraion from './ManageRegistraion';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


const UserPage = () => {

  const [flag, setFlag] = useState(false)
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    const fetch = () => {
      setFlag(true)
      getUserInfo().then((data) => {
        setCurrentUser(data.data)
        setFlag(false);
      })
    }
    fetch();
  }, [])

  return (
    <div className={styles['user-page']}>
      {
        flag
          ?
          (
            <CircularProgress />
          )
          :
          (
            <>
              <Stack direction={"row"} spacing={1} className={styles['user-info-section']}>
                <Avatar sx={{ width: 60, height: 60 }} src={currentUser.avatar} />
                <Stack>
                  <Typography align={"left"}
                    fontSize={20}> {currentUser.nickname}</Typography>
                  <Typography align={"left"} fontSize={15}
                    fontWeight={500}> {currentUser.email}
                  </Typography>
                </Stack>
              </Stack>
            </>
          )
      }
      <ManageRegistraion />
      <div className={styles['user-post-event']}>
        <div className={styles['user-post-event-title']}>
          Post event
        </div>
        <UserPost />
      </div>
      <UserRegistration />
    </div>
  )
}

export default UserPage