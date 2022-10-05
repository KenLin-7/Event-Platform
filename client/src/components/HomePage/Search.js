import React, { useState } from 'react'
import styles from '../../asserts/stylesheet/Home/Search.module.css'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'


const Search = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const onSearchInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const onSearchInputClick = () => {
    if(searchInput === ""){
      navigate('/filter/')
    }
    navigate(`/filter/${searchInput}`)
  }

  return (
    <section className={styles['search-section']}>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', boxShadow: 12 }}
        className={styles['search-input']}
      >

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Events"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={onSearchInputChange}
          />
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={onSearchInputClick}
          >
            <SearchIcon />
          </IconButton>


      </Paper>
      <div className={styles['title-1']}>
        A new EVENT
      </div>
      <div className={styles['title-2']}>
        Experience
      </div>
    </section>
  )
}

export default Search