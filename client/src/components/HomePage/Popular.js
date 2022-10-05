import React from 'react';
import styles from '../../asserts/stylesheet/Home/Popular.module.css';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Divider from '@mui/material/Divider'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageTest from '../../asserts/images/test-image.png';
import CircularProgress from '@mui/material/CircularProgress';
import humanDateConvert from '../../utils/humanDateConvert'
import { useNavigate } from 'react-router-dom';

const Popular = ({ others, flag }) => {
  const navigate = useNavigate();

  const handleToEventDetail = (id) => {
    navigate(`/eventDetail/${id}`)
  }

  return (
    <div className={styles['most-popular-section']}>
      <div className={styles['most-popular-title']}>
        Most popular events
      </div>

      {
        flag
          ?
          (
            <CircularProgress />
          )
          :
          (
            <Box className={styles["event-containter"]}>
              {
                others.map(event => {
                  return (
                    <Card variant="outlined" className='event-card' key={event.eventId} onClick={() => handleToEventDetail(event.eventId)}>
                      <div className={styles['event-card-img']}>
                        <img className={styles['event-image']} src={ImageTest} alt="" />
                      </div>



                      <Box sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                        <div className={styles["event-card-title"]}>
                          {event.title}
                        </div>

                        <div className={styles["event-card-people-num"]}>
                          {event.registrationList.length}/{event.maxParticipant}
                        </div>
                      </Box>

                      <div className={styles["event-card-date"]}>
                        <AccessAlarmIcon sx={{marginTop: -0.4}} /> {humanDateConvert(event.startDate)}
                      </div>

                      <Divider />

                      {
                            event.registrationList.length === 0
                              ?
                              (
                                <div className={styles['avatars-group-text-1']}>
                                  No one has applied for this event yet, come and join us !!!
                                </div>
                              )
                              :
                              (
                                <div className={styles['avatars-group-text-2']}>
                                  {event.registrationList.length} people are interested and have submitted an application
                                </div>
                              )
                          }
                    </Card>
                  )
                })
              }

            </Box>
          )
      }

    </div>
  )
}

export default Popular