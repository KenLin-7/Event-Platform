import React, { useEffect, useState } from 'react'
import styles from '../../asserts/stylesheet/UserPage/UserPage.module.css';
import {
  Avatar,
  Stack,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Divider from '@mui/material/Divider'
import ImageTest from '../../asserts/images/test-image.png'
import { getUserInfo } from '../../api/UserAPI'
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import usePagination from "../Pagination";
import UserRegistration from './UserRegistration'

const cards = [
  { id: 1, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 2, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 3, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 4, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 5, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 6, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
];

const UserPage = () => {
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = useState(false)
  const [currentUser, setCurrentUser] = useState({});

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(cards.length / PER_PAGE);
  const _DATA = usePagination(cards, PER_PAGE);

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

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };


  const handleClickOpenCancel = () => {
    setOpen(true);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

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
                <Avatar sx={{ width: 60, height: 60 }} src="" />
                <Stack>
                  <Typography align={"left"}
                    fontSize={20}> {currentUser.nickname}</Typography>
                  <Typography align={"left"} fontSize={15}
                    fontWeight={500}> {currentUser.email}
                  </Typography>
                </Stack>
              </Stack>

              <div className={styles['user-post-event']}>
                <div className={styles['user-post-event-title']}>
                  Post event
                </div>

                <Box className={styles["event-containter"]}>
                  {
                    _DATA.currentData().map(card => {
                      return (
                        <Card variant="outlined" className='event-card' key={card.id}>
                          <div className={styles['event-card-img']}>
                            <img className={styles['event-image']} src={ImageTest} alt="" />
                          </div>



                          <Box sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                            <div className={styles["event-card-title"]}>
                              Vulputate felis purus viverra morbi facilisi eget
                              Vulputate felis purus viverra morbi facilisi eget
                              Vulputate felis purus viverra morbi facilisi eget

                            </div>

                            <div className={styles["event-card-people-num"]}>
                              5/7
                            </div>
                          </Box>

                          <div className={styles["event-card-date"]}>
                            <AccessAlarmIcon sx={{ marginTop: -0.3 }} /> 06-09-2022
                          </div>

                          <Divider />

                          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1.5, marginBottom: 1.5 }}>
                            <Button variant="contained" sx={{ marginLeft: 0.5 }}>Edit</Button>
                            <Button variant="contained" color='error' sx={{ marginLeft: 1 }} onClick={handleClickOpenCancel}>Cancel</Button>
                          </Box>
                        </Card>
                      )
                    })
                  }
                  
                </Box>
                <Pagination
                    count={count}
                    color="primary"
                    onChange={handleChange}
                    page={page}
                    className={styles["pagination"]}
                  />
                <Dialog
                  open={open}
                  onClose={handleCloseCancel}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to cancel this post?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCancel}>Disagree</Button>
                    <Button onClick={handleCloseCancel} autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>

              </div>
            </>
          )
      }
      <UserRegistration />
    </div>
  )
}

export default UserPage