import React, { useEffect, useState } from 'react'
import useUpload from '../../hook/useUpload'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import formValidate from '../../utils/validation';
import {remove} from '../../api/UserAPI'
import {Button, Card, Input,Stack} from "@mui/material";

export default function UploadImage() {

    const {imageURL,uploadImage,progress,buffer} = useUpload()
    const [image,setImage] = useState("")


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
            <Input  sx={{marginLeft:2,marginY:2}} type={'file'} onChange={onChange} accept="image/*" />
            <Button sx={{padding:1, marginLeft:4,marginY:2}}  variant={"contained"} onClick={onClick}>submit</Button>
            {
                image &&
                <Stack  sx={{padding:1}}>
                <img src={URL.createObjectURL(image)} alt="avatar"/>
                </Stack>
            }

        </div>
    )
}
