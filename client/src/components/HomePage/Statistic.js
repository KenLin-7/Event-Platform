import React from 'react'
import styles from '../../asserts/stylesheet/Home/Statistic.module.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const items = [
  { id: 1, data: "300K", title: "User active" },
  { id: 2, data: "52.5K", title: "Events" },
  { id: 3, data: "17.5K", title: "Finished events" },
  { id: 4, data: "35.58", title: "Registrations" },

]

const Statistic = () => {
  return (
    <div className={styles['statistic-section']}>
      <div className={styles['statistic-items']}>
        {
          items.map(item => {
            return (
              <div key={item.id} className={styles['statistic-user-active']}>
                <AccountCircleOutlinedIcon className={styles['statistic-icon']}/>
                <div className={styles['statistic-data']}>
                  {item.data}
                </div>
                <div className={styles['statistic-title']}>
                  {item.title}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Statistic