import React from 'react'
import styles from '../../asserts/stylesheet/Home/LatestEvent.module.css'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageTest from '../../asserts/images/test-image.png';
import CircularProgress from '@mui/material/CircularProgress';
import humanDateConvert from '../../utils/humanDateConvert';

const LatestEvent = ({ latestEvents, flag }) => {
  return (
    <div className={styles['latest-event-secion']}>
      <div className={styles['latest-event-title']}>Latest event</div>

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
                latestEvents.map(event => {
                  return (
                    <Card variant="outlined" className={styles['event-card']} key={event.eventId}>
                      <div className={styles['event-card-img']}>
                        <img className={styles["event-image"]} src={ImageTest} alt="" />
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
                        <AccessAlarmIcon /> {humanDateConvert(event.startDate)}
                      </div>

                      <Divider />

                      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2.5 }}>
                        <div className={styles["event-card-participants"]}>
                          <div className={styles['avatars-group']}>
                            <AvatarGroup max={4} sx={{ float: 'left' }} className={styles['avatars-group-control']}>
                              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                              <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                          </div>
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

export default LatestEvent