import React from 'react'
import Search from './Search'
import '../../asserts/stylesheet/home.css'
import LatestEvent from './LatestEvent'
import GetStart from './GetStart'
import Popular from './Popular'


const Home = () => {
  return (
    <div className='home-container'>
      <Search />
      <LatestEvent />
      <GetStart />
      <Popular />
    </div>
  )
}

export default Home