import React, { useEffect, useState } from 'react'
import useUpload from '../hook/useUpload'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import formValidate from '../utils/validation';
import {remove} from '../api/UserAPI'
import { getNotifications } from '../api/NotificationAPI';
export default function TestUploadImage() {

    const {imageURL,uploadImage,progress,buffer,isUploaded} = useUpload()
    const [image,setImage] = useState("")


    useEffect(()=>{
        console.log(isUploaded);
    },[isUploaded])
    const onClick = ()=>{
        uploadImage(image,"avatar")
        // remove()
    }

    const onChange = (e)=>{
        setImage(e.target.files[0])
    }
    
    useEffect(()=>{
        console.log(imageURL);
    },[imageURL])


  return (
    <div>
        <input type={'file'} onChange={onChange} accept="image/*"/>
        <button onClick={onClick}>submit</button>
        {
            image && <img src={URL.createObjectURL(image)} alt="avatar"/>
        }

        <button onClick={getNotifications}>Get Notifications</button>
    </div>
  )
}
