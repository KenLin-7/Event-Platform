import React, { useState, useEffect } from 'react';
import styles from '../../asserts/stylesheet/UserPage/UserPost.module.css';
import {
  Button,
  Pagination,
} from "@mui/material";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Divider from '@mui/material/Divider'
import ImageTest from '../../asserts/images/test-image.png'
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import usePagination from "../Pagination";
import { getCurrentUserEvents } from '../../api/EventAPI'
import humanDateConvert from '../../utils/humanDateConvert'
import confirmedParticipants from '../../utils/confirmedParticipants';
import { useNavigate } from 'react-router-dom';

const UserPost = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [events, setEvents] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(events.length / PER_PAGE);
  const _DATA = usePagination(events, PER_PAGE);

  useEffect(() => {
    const fetch = () => {
      setFlag(true)
      getCurrentUserEvents().then((data) => {
        setEvents(data.data)
        setFlag(false)
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

  const handleToEditPage = (id) => {
    navigate(`/eventedit/${id}`)
  }

  return (
    <div>
      {
        flag
          ?
          (
            <CircularProgress />
          )
          :
          (
            <>
              {
                events.length === 0
                  ?
                  (
                    <div className={styles['no-data-notification']}>
                      You dont have posts
                    </div>
                  )
                  :
                  (
                    <>
                      <Box className={styles["event-containter"]}>
                        {
                          _DATA.currentData().map(card => {
                            return (
                              <Card variant="outlined" className='event-card' key={card.eventId}>
                                <div className={styles['event-card-img']}>
                                  <img className={styles['event-image']} src={card.image} alt="" />
                                </div>



                                <Box sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                                  <div className={styles["event-card-title"]}>
                                    {card.title}
                                  </div>

                                  <div className={styles["event-card-people-num"]}>
                                    {confirmedParticipants(card.registrationList)}/{card.maxParticipant}
                                  </div>
                                </Box>

                                <div className={styles["event-card-date"]}>
                                  <AccessAlarmIcon sx={{ marginTop: -0.3 }} /> {humanDateConvert(card.startDate)}
                                </div>

                                <Divider />

                                <div className={styles['group-btn']}>
                                  <div className={styles['approve-btn']} onClick={handleClickOpenCancel}>
                                    Edit
                                  </div>
                                  <div className={styles['reject-btn']} onClick={handleClickOpenCancel}>
                                    Cancel
                                  </div>
                                </div>
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
                    </>
                  )
              }

            </>
          )
      }
    </div>
  )
}

export default UserPost