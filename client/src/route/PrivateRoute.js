import { Navigate, Outlet } from 'react-router-dom'
import React,{useEffect} from 'react'
import { CircularProgress,Stack,Alert } from '@mui/material'
import { useUser } from '../context/UserContext'
export const  PrivateRoute = ()=> {
    const {auth,loading} = useUser()

    useEffect(()=>{
            console.log(auth);
    },[auth])
    return (
        loading ? (
            <Stack sx={{height:'100%',widht:"100%"}}>
            <Alert severity="warning">You have to login first</Alert>

            <Stack sx={{height:'100%',widht:"100%"}} justifyContent="center" alignItems={'center'}>
                <CircularProgress/>
            </Stack>
            </Stack>

        ):(
            auth!==null? <Outlet/>:<Navigate to={'/login'}/>
        )

    )
}
