import React from 'react'
import styles from '../../asserts/stylesheet/Message.module.css'
import testImage from '../../asserts/images/test-image.png'
import { Divider } from '@mui/material'
export default function MessageNotification() {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
          <span className={styles.title}>Your registration has been rejected</span>
      </div>
      <div className={styles.event}>
          <img src={testImage} style={{width:'100px',height:'100px'}} alt='Event cover'/>
          <div className={styles.content}>
            <span>Evnet Title</span>
            <span>dsadasdasdasdasdasdas</span>
          </div>

      </div>
      <div className={styles.time}>
        2022-09-10 20:00:00
      </div>
    </div>
  )
}
