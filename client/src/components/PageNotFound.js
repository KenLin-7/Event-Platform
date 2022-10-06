import { Typography,Stack } from '@mui/material'
import React from 'react'
import icon from '../asserts/images/icon/icon_not_data_1.png'
export default function PageNotFound() {
  return (
    <>
        <Stack justifyContent={'center'} sx={{height:'70%'}} alignItems={"center"}>

            <Typography variant='h2' sx={{fontWeight:'bolder'}}>Oops!</Typography>
           <Stack justifyContent={'center'} alignItems={"center"} sx={{marginTop:'30px'}}>
              <img src={icon} width="64px" height="64px"/>
              <Typography variant="h5" sx={{marginTop:'20px'}}>Page not found</Typography>
           </Stack>

        </Stack>

    </>
  )
}
