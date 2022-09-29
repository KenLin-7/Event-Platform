import React from 'react'
import Search from './Search'
import styles from '../../asserts/stylesheet/Home/Home.module.css'
import LatestEvent from './LatestEvent'
import GetStart from './GetStart'
import Popular from './Popular'
import Statistic from './Statistic'


const Home = () => {
  return (
    <div className={styles['home-container']}>
      <Search />
      <LatestEvent />
      <GetStart />
      <Popular />
      <Statistic />
    </div>
  )
}

export default Home