import React from 'react'
import '../../asserts/stylesheet/latestEvent.css'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const cards = [
  { id: 1, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 2, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 3, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 4, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
];

const LatestEvent = () => {
  return (
    <div className='latest-event-secion'>
      <div className='latest-event-title'>Latest event</div>

      <Box className="event-containter">
        {
          cards.map(card => {
            return (
              <Card variant="outlined" className='event-card' key={card.id}>
                <div className='event-card-img'>
                  <img className="event-image" src="" alt="" />
                </div>



                <Box sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                  <div className="event-card-title">
                    Vulputate felis purus viverra morbi facilisi eget
                  </div>

                  <div className="event-card-people-num">
                    5/7
                  </div>
                </Box>

                <div className="event-card-date">
                  <AccessAlarmIcon /> 06-09-2022
                </div>

                <Divider />

                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2.5}}>
                  <div className="event-card-participants">
                    <div className='avatars-group'>
                      <AvatarGroup max={4} sx={{ float: 'left' }} className='avatars-group-control'>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                      </AvatarGroup>
                    </div>
                    <div className='avatars-group-text'>
                      35 people are waiting for approval
                    </div>
                  </div>

                  <div className='event-card-likes'>
                    <FavoriteBorderIcon sx={{ marginRight: 0.3, marginTop: 0.2}}/> 120
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

export default LatestEvent