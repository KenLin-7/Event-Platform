import React from 'react'
import { useLocation,Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function NoHeaderRoute({path=[], handleClick}) {

    const {pathname} = useLocation()

  return (
    <>
        {!path.includes(pathname)&&<Header handleClick={handleClick}/>}
        <Outlet/>
    </>
  )
}
