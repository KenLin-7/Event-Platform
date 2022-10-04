import React, { useEffect, useState } from 'react'
import styles from '../../asserts/stylesheet/UserPage/UserPage.module.css';
import {
  Avatar,
  Stack,
  Typography
} from "@mui/material";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Divider from '@mui/material/Divider'
import ImageTest from '../../asserts/images/test-image.png'
import { useUser } from '../../context/UserContext'
import { getUserInfo } from '../../api/UserAPI'
import { getCurrentUserEvents } from '../../api/EventAPI';
import CircularProgress from '@mui/material/CircularProgress';

const cards = [
  { id: 1, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 2, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 3, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 4, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 5, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 6, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
];

const UserPage = ({email}) => {
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    const fetch = () => {
      getUserInfo(email).then((data) => {
        console.log(data)        
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
                <Avatar sx={{ width: 60, height: 60 }} src="" />
                <Stack>
                  <Typography align={"left"}
                    fontSize={20}> </Typography>
                  <Typography align={"left"} fontSize={15}
                    fontWeight={500}>
                  </Typography>
                </Stack>
              </Stack>

              <div className={styles['user-post-event']}>
                <div className={styles['user-post-event-title']}>
                  Post event
                </div>

                <Box className={styles["event-containter"]}>
                  {
                    cards.map(card => {
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

                          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2.5 }}>
                            <div className={styles["event-card-orgnizer"]}>
                              @Orgnizer name
                            </div>

                          </Box>
                        </Card>
                      )
                    })
                  }

                </Box>

              </div>
            </>
          )
      }
    </div>
  )
}

export default UserPage