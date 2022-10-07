import { Navigate, Outlet } from 'react-router-dom'
import React,{useEffect} from 'react'

import { useUser } from '../context/UserContext'
export const  PrivateRoute = ()=> {
    const {auth,loading} = useUser()
    useEffect(()=>{
        console.log(auth);
        console.log(loading);
    },[loading,auth])
    return (
        loading ? (
            <div>Loading</div>
        ):(
            auth? <Outlet/>:<Navigate to={'/login'}/>
        )

    )
}
