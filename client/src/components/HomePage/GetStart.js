import React from 'react'
import styles from '../../asserts/stylesheet/GetStart.module.css'
import Box from '@mui/material/Box';


const GetStart = () => {
  return (
    <div className={`${styles['get-start-section']}`}>

      <Box className={styles['get-start-inner-layout']} >
        <div className={styles['get-start-text']}>
          <div className={styles['get-start-text-1']}>
            Overline
          </div>

          <div className={styles['get-start-text-2']}>
            Sapien ipsum scelerisque convallis fusce
          </div>

          <div className={styles['get-start-text-3']}>
            Overline
          </div>

          <Box sx={{ display: 'flex', flexDirection: 'row'}} className="get-start-btn-group">
            <button className={styles['get-start-btns']}>Get started</button>
            <button className={styles['get-start-btns']}>Learn more</button>
          </Box>
        </div>

        <div className={styles['get-start-img']}></div>
      </Box>
    </div>
  )
}

export default GetStart