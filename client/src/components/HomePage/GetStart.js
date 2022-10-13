import React from 'react'
import styles from '../../asserts/stylesheet/Home/GetStart.module.css'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'

const GetStart = () => {
  const navigate = useNavigate();

  const onStartClick = () => {
    navigate('/filter/')
  }

  return (
    <div className={`${styles['get-start-section']}`}>

      <Box className={styles['get-start-inner-layout']} >
        <div className={styles['get-start-text']}>
          <div className={styles['get-start-text-1']}>
            Slogan
          </div>

          <div className={styles['get-start-text-2']}>
            Find whatever you want, You're not alone
          </div>

          <Box sx={{ display: 'flex', flexDirection: 'row',marginTop:'20px'}} className="get-start-btn-group">
            <button className={styles['get-start-btns']} onClick={onStartClick}>Get started</button>
            <button className={styles['get-start-btns']}>Learn more</button>
          </Box>
        </div>

        <div className={styles['get-start-img']}></div>
      </Box>
    </div>
  )
}

export default GetStart