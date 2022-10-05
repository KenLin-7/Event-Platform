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

const Popular = ({ others, flag }) => {
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
                    <Card variant="outlined" className='event-card' key={event.eventId}>
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

                      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2.5 }}>
                        <div className={styles["event-card-participants"]}>
                          <div className={styles['avatars-group-text']}>
                            35 people are waiting for approval
                          </div>
                        </div>

                        <div className={styles['event-card-likes']}>
                          <FavoriteBorderIcon sx={{ marginRight: 0.3, marginTop: 0.2 }} /> 120
                        </div>
                      </Box>
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