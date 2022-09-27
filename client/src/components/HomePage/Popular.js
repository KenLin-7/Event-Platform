import React from 'react';
import styles from '../../asserts/stylesheet/Home/Popular.module.css';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Divider from '@mui/material/Divider'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageTest from '../../asserts/images/test-image.png';

const cards = [
  { id: 1, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 2, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 3, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 4, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 5, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },

];

const Popular = () => {
  return (
    <div className={styles['most-popular-section']}>
      <div className={styles['most-popular-title']}>
        Most popular events
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
                  <AccessAlarmIcon /> 06-09-2022
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
    </div>
  )
}

export default Popular