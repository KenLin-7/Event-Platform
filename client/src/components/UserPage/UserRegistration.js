import React, { useEffect, useState } from 'react'
import {
  Pagination,
} from "@mui/material";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Divider from '@mui/material/Divider'
import ImageTest from '../../asserts/images/test-image.png'
import CircularProgress from '@mui/material/CircularProgress';
import usePagination from "../Pagination";
import styles from '../../asserts/stylesheet/UserPage/UserRegistration.module.css'
import { getUserRegistrationEvents } from '../../api/EventAPI'
import humanDateConvert from '../../utils/humanDateConvert'
import confirmedParticipants from '../../utils/confirmedParticipants';

const UserRegistration = () => {
  const [events, setEvents] = useState([]);
  const [flag, setFlag] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(events.length / PER_PAGE);
  const _DATA = usePagination(events, PER_PAGE);

  useEffect(() => {
    const fetch = () => {
      setFlag(true)
      getUserRegistrationEvents().then((data) => {
        setEvents(data.data)
        console.log(data.data)
        setFlag(false)
      })
    }

    fetch()
  }, [])

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div className={styles['user-registration-container']}>
      <div className={styles['user-registration-title']}>
        My Registration
      </div>

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
                      You have no registered any event
                    </div>
                  )
                  :
                  (
                    <div className={styles['user-post-event']}>
                      <Box className={styles["event-containter"]}>
                        {
                          _DATA.currentData().map((card, index) => {
                            return (
                              <div key={index}>
                                {
                                  card.event.status === "2"
                                    ?
                                    (
                                      <Card variant="outlined" key={index}  className={styles['event-card-cancelled']}>

                                        <div className={styles['event-card-img']}>
                                          <img className={styles['event-image']} src={ImageTest} alt="" />
                                          <div className={styles['cancel-label']}>Cancelled</div>
                                        </div>

                                        <Box sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                                          <div className={styles["event-card-title"]}>
                                            {card.event.title}
                                          </div>
                                          <div className={styles['registration-status-label-container']}>
                                            {
                                              card.status === "rejected" &&
                                              (
                                                <div className={styles['registration-status-label-rejected']}>
                                                  {card.status}
                                                </div>
                                              )
                                            }

                                            {
                                              card.status === "confirmed" &&
                                              (
                                                <div className={styles['registration-status-label-confirmed']}>
                                                  {card.status}
                                                </div>
                                              )
                                            }

                                            {
                                              card.status === "pending" &&
                                              (
                                                <div className={styles['registration-status-label-pending']}>
                                                  {card.status}
                                                </div>
                                              )
                                            }


                                          </div>
                                        </Box>

                                        <div className={styles["event-card-date"]}>
                                          <AccessAlarmIcon sx={{ marginTop: -0.3 }} /> {humanDateConvert(card.event.startDate)}
                                        </div>

                                        <div className={styles["event-card-location"]}>
                                          {card.event.location}
                                        </div>

                                        <Divider />

                                        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1.5, marginBottom: 1.5, fontSize: 12, marginLeft: 1 }}>
                                          @Orgnizer: {card.event.owner.nickname}
                                        </Box>

                                      </Card>
                                    )
                                    :
                                    (
                                      <Card variant="outlined" className='event-card' key={index}>
                                        <div className={styles['event-card-img']}>
                                          <img className={styles['event-image']} src={ImageTest} alt="" />
                                        </div>

                                        <Box sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                                          <div className={styles["event-card-title"]}>
                                            {card.event.title}
                                          </div>
                                          <div className={styles['registration-status-label-container']}>
                                            {
                                              card.status === "rejected" &&
                                              (
                                                <div className={styles['registration-status-label-rejected']}>
                                                  {card.status}
                                                </div>
                                              )
                                            }

                                            {
                                              card.status === "confirmed" &&
                                              (
                                                <div className={styles['registration-status-label-confirmed']}>
                                                  {card.status}
                                                </div>
                                              )
                                            }

                                            {
                                              card.status === "pending" &&
                                              (
                                                <div className={styles['registration-status-label-pending']}>
                                                  {card.status}
                                                </div>
                                              )
                                            }


                                          </div>
                                        </Box>

                                        <div className={styles["event-card-date"]}>
                                          <AccessAlarmIcon sx={{ marginTop: -0.3 }} /> {humanDateConvert(card.event.startDate)}
                                        </div>

                                        <div className={styles["event-card-location"]}>
                                          {card.event.location}
                                        </div>

                                        <Divider />

                                        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1.5, marginBottom: 1.5, fontSize: 12, marginLeft: 1 }}>
                                          @Orgnizer: {card.event.owner.nickname}
                                        </Box>
                                      </Card>
                                    )
                                }
                              </div>
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
                    </div>
                  )
              }
            </>
          )
      }
    </div >
  )
}

export default UserRegistration