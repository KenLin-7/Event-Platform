import React from 'react'
import styles from '../../asserts/stylesheet/Home/LatestEvent.module.css'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import DefaultAvatar from '../../asserts/images/default-avatar.jpg';
import TestImage from '../../asserts/images/test-image.png';
import CircularProgress from '@mui/material/CircularProgress';
import humanDateConvert from '../../utils/humanDateConvert';
import { useNavigate } from 'react-router-dom'

const LatestEvent = ({ latestEvents, flag, ref }) => {
  const navigate = useNavigate();
  const handleToEventDetail = (id) => {
    navigate(`/event/detail/${id}`)
  }

  return (
    <div className={styles['latest-event-secion']} ref={ref}>
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
                    <Card variant="outlined" className={styles['event-card']} key={event.eventId} onClick={() => handleToEventDetail(event.eventId)}>
                      <div className={styles['event-card-img']}>
                        {
                          event.image === "" || event.image === null
                            ?
                            (
                              <img className={styles["event-image"]} src={TestImage} alt="" />
                            )
                            :
                            (
                              <img className={styles["event-image"]} src={event.image} alt="" />
                            )
                        }
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
                            <AvatarGroup max={3} sx={{ float: 'left' }} className={styles['avatars-group-control']}>
                              {
                                event.registrationList.map((user, index) => {
                                  return (
                                    <div key={index}>
                                      {
                                        user.requester.avatar === null
                                          ?
                                          (
                                            <Avatar alt="Remy Sharp" src={DefaultAvatar} />
                                          )
                                          :
                                          (
                                            <Avatar alt="Remy Sharp" src={user.requester.avatar} />
                                          )
                                      }

                                    </div>
                                  )
                                })
                              }
                            </AvatarGroup>
                          </div>

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

                        </div>

                      </Box>
                    </Card>
                  )
                })
              }

            </Box>
          )
      }

    </div >
  )
}

export default LatestEvent