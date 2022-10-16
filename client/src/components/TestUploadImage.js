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
    const [event,setEvent] = useState({image:"https://firebasestorage.googleapis.com/v0/b/eventplazaweb.appspot.com/o/event%2F005U1peply1fff1uddgouj30xc0m8a9y.jpg1664782635262?alt=media&token=9e8175f2-a61e-471e-a02d-b75beb4e1ec6",title:"dsasdasda"})

    useEffect(()=>{
    },[isUploaded])
    const onClick = ()=>{
        uploadImage(image,"avatar")
        // remove()
    }

    const onChange = (e)=>{
        setImage(e.target.files[0])
    }
    
    useEffect(()=>{
    },[imageURL])


  return (
    <div>
        <input type={'file'} onChange={onChange} accept="image/*"/>
        <button onClick={onClick}>submit</button>
        {/* {
            image && <img src={URL.createObjectURL(image)} alt="avatar"/>
        } */}

{
    !isUploaded ? (            
    <div>
        {
        !image ? (
            <img src={event.image}/>
        ):(
            <img src={URL.createObjectURL(image)} alt="avatar"/>
        )
        }
      </div>
):(
    <div>Upload</div>
)

}
        <button onClick={getNotifications}>Get Notifications</button>
    </div>
  )
}
