import React from 'react';
import styles from '../asserts/stylesheet/Footer.module.css'
import Box from '@mui/material/Box';


const Footer = () => {
  return (
    <div className={styles['footer']}>
      <div className={styles['footer-section-1']}>
        <Box sx={{ display: 'flex' }}>
          <div className={styles['footer-icon']}>
          </div>
          <div className={styles['footer-title']}>
            Event Plaza
          </div>
        </Box>
        <Box className={styles['support-service-license']}>
          <div className={styles['footer-info-1']}>
            Support
          </div>
          <div className={styles['footer-info-2']}>
            Term of service
          </div>
          <div className={styles['footer-info-3']}>
            License
          </div>
        </Box>
      </div>

      <div className={styles['footer-section-2']}>
        <div className={styles['footer-2-list']}>
          <div>Latest event</div>
          <div>Search</div>
          <div>Community</div>
          <div>About us</div>
        </div>

        <button className={styles['get-start-btns']}>Get started</button>
      </div>
      <div className={styles['footer-section-3']}>
        <div className={styles['footer-3-1']}>
          Nibh volutpat, aliquam id sagittis elementum. Pellentesque laoreet velit, sed egestas in. Id nam semper dolor tellus vulputate eget turpis.
          Nibh volutpat, aliquam id sagittis elementum. Pellentesque laoreet velit, sed egestas in. Id nam semper dolor tellus vulputate eget turpis.
          Nibh volutpat, aliquam id sagittis elementum. Pellentesque laoreet velit, sed egestas in. Id nam semper dolor tellus vulputate eget turpis.
          Nibh volutpat, aliquam id sagittis elementum. Pellentesque laoreet velit, sed egestas in. Id nam semper dolor tellus vulputate eget turpis.
        </div>
        <button className={styles['footer-3-2']}>
          Sign in
        </button>
      </div>
    </div>
  )
}

export default Footer