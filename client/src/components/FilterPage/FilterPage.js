import React, { useState, useEffect } from 'react'
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
import usePagination from "../Pagination";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { search, searchEventByCategoryAndKeyword,  searchEventByCategory } from '../../api/FilterAPI'
import humanDateConvert from '../../utils/humanDateConvert';
import CircularProgress from '@mui/material/CircularProgress';
import { getAllEvent} from '../../api/EventAPI';


const items = [
  { id: 11, title: "All" },
  { id: 1, title: "Food&Drink" },
  { id: 2, title: "Business" },
  { id: 3, title: "Music" },
  { id: 4, title: "Film&Media" },
]

const FilterPage = () => {
  const params = useParams()
  let [page, setPage] = useState(1);
  const [filteredEventList, setFilteredEventList] = useState([]);
  const PER_PAGE = 2;
  const count = Math.ceil(filteredEventList.length / PER_PAGE);
  const _DATA = usePagination(filteredEventList, PER_PAGE);
  const [searchInput, setSearchInput] = useState("");
  // const [categorySelction, setCategorySelection] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getFilteredEvent = () => {
      setLoading(true);
      const keyword = params.keyword
      const category = params.category

      console.log(keyword)
      console.log(category)

      //两个都是空 显示所有
      if ((keyword === undefined || keyword === "") && (category === undefined || category === "")) {
        getAllEvent().then((data) => {
          setFilteredEventList(data.data);
          setLoading(false);
        })
      }

      //有keyword没有category
      if(keyword !== undefined && category === undefined){
        search(keyword).then((data) => {
          setFilteredEventList(data.data);
          setLoading(false);
        });
      }

      //两个都有
      if(keyword !== undefined && category !== undefined){
        searchEventByCategoryAndKeyword(keyword, category).then((data) => {
          setFilteredEventList(data.data);
          setLoading(false);
        });
      }

      //没有keyword有category
      if(keyword === undefined && category !== undefined){
        console.log("123")
        searchEventByCategory(category).then((data) => {
          setFilteredEventList(data.data);
          setLoading(false);
        });
      }
    }
    

    getFilteredEvent();
  }, [params.keyword, params.category]);

  const onClickCategory = (category) => {
    const keyword = params.keyword
    if(keyword !== undefined){
      //有keyword 也有category
      navigate(`/filter/${keyword}/${category}`)
    }else{
      //只有category
      navigate(`/filter/all/${category}`)
    }
  }

  const handleToEventDetail = (id) => {
    navigate(`/event/detail/${id}`)
  }

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const onSearchInputClick = () => {

    if (searchInput === undefined) {
      return
    }
    navigate(`/filter/${searchInput}`)
  }

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
                <div className={styles['filter-items']} key={item.id} onClick={() => onClickCategory(item.title)}>
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
            onChange={onSearchInputChange}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onSearchInputClick}>
            <SearchIcon />
          </IconButton>
        </Paper>

        {
          loading
            ?
            (
              <div className={styles['circularProgress']}>
                <CircularProgress />
              </div>
            )
            :
            (
              <>
                {
                  _DATA.currentData().map(card => {
                    return (
                      <Card variant="outlined" className={styles['event-card']} key={card.eventId} onClick={() => handleToEventDetail(card.eventId)}>

                        <div className={styles['event-card-left']}>
                          <div className={styles["event-card-title"]}>
                            {card.title}
                          </div>

                          <div className={styles["event-card-time"]}>
                            {humanDateConvert(card.startDate)}
                          </div>

                          <div className={styles["event-card-description"]}>
                            {card.description}
                          </div>

                          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2.5 }}>
                            <div className={styles["event-card-participants"]}>
                              <div className={styles['avatars-group']}>
                                <AvatarGroup max={4} sx={{ float: 'left' }} className={styles['avatars-group-control']}>
                                  {
                                    card.registrationList.map((requester,index) => {
                                      return (
                                        <Avatar alt="" src={requester.avatar} key={index}/>
                                      )
                                    })
                                  }
                                </AvatarGroup>
                              </div>

                              <div className={styles['avatars-group-text']}>
                                {card.registrationList.length} participants
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
              </>
            )
        }



      </div>
    </div>
  )
}

export default FilterPage;