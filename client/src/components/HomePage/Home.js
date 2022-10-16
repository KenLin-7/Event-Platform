import React, { useEffect, useState } from 'react'
import Search from './Search'
import styles from '../../asserts/stylesheet/Home/Home.module.css'
import LatestEvent from './LatestEvent'
import GetStart from './GetStart'
import Popular from './Popular'
import Statistic from './Statistic'
import { getLatestEvents } from '../../api/FilterAPI'
import { getStatistic } from '../../api/StatisticAPI'

const Home = ({ref}) => {
  const [latestEvents, setLastestEvents] = useState([]);
  const [others, setOthers] = useState([])
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetch = () => {
      getStatistic()
      setFlag(true)
      getLatestEvents().then((data) => {
        const list = data.data
        const latestEventList = list.slice(0,4)
        const othersList = list.slice(4, list.length)
        setLastestEvents(latestEventList);
        setOthers(othersList)
        setFlag(false)
      });
    }
    fetch();
  }, [])

  return (
    <div className={styles['home-container']}>
      <Search />
      <LatestEvent latestEvents={latestEvents} ref={ref} flag={flag}/>
      <GetStart />
      <Popular others={others} flag={flag}/>
      <Statistic />
    </div>
  )
}

export default Home