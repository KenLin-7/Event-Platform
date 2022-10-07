import React, {useEffect, useState} from 'react'
import useUpload from '../../hook/useUpload'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import formValidate from '../../utils/validation';
import {remove} from '../../api/UserAPI'
import {Button, Card, CircularProgress, Input, Stack, Typography} from "@mui/material";

export default function UploadImage(props) {

    const {imageURL, uploadImage, progress, buffer,isUploaded} = useUpload()
    const [image, setImage] = useState("")

       useEffect(()=>{

            console.log(isUploaded);

        },[isUploaded])


    const onClick = () => {

        uploadImage(image, "event")
        // remove()
    }





    const onChange = (e) => {

        setImage(e.target.files[0])

 
    }


       useEffect(()=>{
           props.onImage(imageURL)
        },[imageURL],[image])





    return (
        <div>
            <Input sx={{marginLeft: 2, marginY: 2}} type={'file'} onChange={onChange}
                   accept="image/*"/>
            <Button sx={{padding: 1, marginLeft: 4, marginY: 2}} variant={"contained"} onClick={onClick}>submit</Button>
            <Typography sx={{marginLeft: 2}}> Remember to click submit, or the image will not be kept</Typography>
             {
                 !isUploaded ? (

                 <div>
                     {
                     !image ? (
                        <Stack sx={{padding:1}}>
                            <img src={props.img}/>
                        </Stack>
                     ):(
                         <Stack sx={{padding:1}}>
                           <Stack>
                             <img src={URL.createObjectURL(image)} alt="event"/>
                           </Stack>
                         </Stack>
                     )
                     }
                   </div>
             ):(
                 <div>Upload</div>
             )

             }
        </div>
    )
}
