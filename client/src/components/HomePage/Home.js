import React from 'react'
import Search from './Search'
import '../../asserts/stylesheet/home.css'
import LatestEvent from './LatestEvent'
import GetStart from './GetStart'


const Home = () => {
  return (
    <div className='home-container'>
      <Search />
      <LatestEvent />
      <GetStart />
    </div>
  )
}

export default Home