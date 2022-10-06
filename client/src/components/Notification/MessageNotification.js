import React from 'react'
import styles from '../../asserts/stylesheet/Message.module.css'
import testImage from '../../asserts/images/test-image.png'
export default function MessageNotification({notification}) {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
          <span className={styles.title}>{notification.message}</span>
      </div>
      {/* <div className={styles.event}>
          <img src={testImage} style={{width:'100px',height:'100px'}} alt='Event cover'/>
          <div className={styles.content}>
            <span>{notification.eventTitle}</span>
            <span>{notification.description}</span>
          </div>
      </div> */}
      <div className={styles.time}>
        {notification.createdTime}
      </div>
    </div>
  )
}
