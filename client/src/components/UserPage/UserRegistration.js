import React, { useEffect, useState } from 'react'
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
import styles from '../../asserts/stylesheet/UserPage/UserRegistration.module.css'

const cards = [
  { id: 1, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 2, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 3, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 4, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 5, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 6, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
];

const UserRegistration = ({flag}) => {
  const [open, setOpen] = React.useState(false);

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;
  const count = Math.ceil(cards.length / PER_PAGE);
  const _DATA = usePagination(cards, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div className={styles['user-registration-container']}>
      <div className={styles['user-registration-title']}>
        User Registration
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

              <div className={styles['user-post-event']}>
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
                            @Orgnizer name
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
              </div>
            </>
          )
      }
    </div>
  )
}

export default UserRegistration