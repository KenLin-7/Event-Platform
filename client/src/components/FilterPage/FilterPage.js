import React, {useState} from 'react'
import styles from '../../asserts/stylesheet/Filter/Filter.module.css'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Pagination from '@mui/material/Pagination';
import ImageTest from '../../asserts/images/test-image.png';
import usePagination from "./Pagination";

const items = [
  { id: 1, title: "Food & Drink" },
  { id: 2, title: "Business" },
  { id: 3, title: "Music" },
  { id: 4, title: "Film & Media" },
]

const cards = [
  { id: 1, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 2, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 3, image: "image", title: "Title", remainingTime: "remaining time", position: "5/7", liked: 120 },
  { id: 4, image: "image", title: "Title", remainingTime: "remaining time", position: "5/8", liked: 120 },
];

const FilterPage = () => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 2;
  const count = Math.ceil(cards.length / PER_PAGE);
  const _DATA = usePagination(cards, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div className={styles['filter-container']}>
      <div className={styles['filter-left-bar']}>
        <div className={styles['filter-title']}>
          Filters
        </div>
        <Divider />
        <div className={styles['filter-list']}>
          <div className={styles['filter-category']}>
            Category
          </div>
          {
            items.map(item => {
              return (
                <div className={styles['filter-items']} key={item.id}>
                  {item.title}
                </div>
              )
            })
          }

        </div>
      </div>
      <div className={styles['filter-content']}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', boxShadow: 1 }}
          className={styles['search-input']}
        >

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Events"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        {
          _DATA.currentData().map(card => {
            return (
              <Card variant="outlined" className={styles['event-card']} key={card.id}>

                <div className={styles['event-card-left']}>
                  <div className={styles["event-card-title"]}>
                    Vulputate felis purus viverra morbi facilisi eget
                    Vulputate felis purus viverra morbi facilisi eget
                    Vulputate felis purus viverra morbi facilisi eget
                  </div>

                  <div className={styles["event-card-time"]}>
                    Fri, Oct 14, 11:30AM
                  </div>

                  <div className={styles["event-card-description"]}>
                    Grab a front row seat at one of Darling Harbour’s best waterfront restaurants and bars at Cockle Bay Wharf or Harbourside Shopping Centre
                  </div>

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
                        5 participants
                      </div>
                    </div>

                  </Box>
                </div>

                <div className={styles['event-card-img']}>
                  <img className={styles["event-image"]} src={ImageTest} alt="" />
                </div>
              </Card>

            )
          })
        }
        <Pagination 
          count={count} 
          color="primary" 
          onChange={handleChange}
          page={page}
          className={styles["pagination"]}
          />

      </div>
    </div>
  )
}

export default FilterPage;