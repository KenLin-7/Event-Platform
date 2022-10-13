import React, { useEffect, useState } from 'react'
import styles from '../../asserts/stylesheet/Home/Statistic.module.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {getStatistic} from '../../api/StatisticAPI'
const items = [
  { id: 1, data: "300K", title: "User active" },
  { id: 2, data: "52.5K", title: "Events" },
  { id: 3, data: "17.5K", title: "Finished events" },
  { id: 4, data: "35.58", title: "Registrations" },

]




const Statistic = () => {

  const [statistic,setStatistic] = useState({})

useEffect(()=>{
  getStatistic().then((res)=>{
    setStatistic(res.data)
  })
},[])
  return (
    <div className={styles['statistic-section']}>
      <div className={styles['statistic-items']}>
        

              <div  className={styles['statistic-user-active']}>
                <div className={styles['statistic-data']}>
                  {statistic.activeUsers}
                </div>
                <div className={styles['statistic-title']}>
                User active
                </div>
              </div>
              <div  className={styles['statistic-user-active']}>
                <div className={styles['statistic-data']}>
                
                  {statistic.totalEvents}
                </div>
                <div className={styles['statistic-title']}>
                Events
                </div>
              </div>
              <div  className={styles['statistic-user-active']}>
                <div className={styles['statistic-data']}>
                  {statistic.finishedEvents}
                </div>
                <div className={styles['statistic-title']}>
                Finished events                
                </div>
              </div>
              <div  className={styles['statistic-user-active']}>
                <div className={styles['statistic-data']}>
                  {statistic.registrations}
                </div>
                <div className={styles['statistic-title']}>
                Registrations
                </div>
              </div>        
      </div>
    </div>
  )
}

export default Statistic