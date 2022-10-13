import React, {useEffect, useState} from 'react'
import useUpload from '../../hook/useUpload'
import {Button, Card, CircularProgress, Input, Stack, Typography} from "@mui/material";

export default function UploadImage(props) {

    const {imageURL, uploadImage, progress, buffer, isUploaded} = useUpload()
    const [image, setImage] = useState("")
    const [uploading, setUploading] = useState(false)

    const onClick = () => {
        setUploading(true)
        uploadImage(image, "event")
        // remove()
    }

    const onChange = (e) => {

        setImage(e.target.files[0])

    }


    useEffect(() => {
        if (imageURL) {
            props.onImage(imageURL)
        }
    }, [imageURL])


    return (
        <div>
            <Stack direction={"row"} sx={{padding:1 ,marginLeft: 2, marginY:3} }>
            <input  type={'file'} onChange={onChange}
                   accept="image/*"/>
                <Button sx={{marginLeft: 2}} variant={"contained"} onClick={onClick}>submit</Button>

            </Stack>
                <Typography sx={{marginLeft: 2}}> Remember to click submit, or the image will not be kept</Typography>
            {
                !isUploaded ? (
                        !uploading ?
                            (<div>
                                {
                                    !image ? (
                                            <Stack sx={{padding: 1}}>
                                                <img src={props.img}/>
                                            </Stack>
                                        )
                                        :
                                        (
                                            <Stack sx={{padding: 1}}>
                                                <Stack>
                                                    <img src={URL.createObjectURL(image)} alt="event"/>
                                                </Stack>
                                            </Stack>
                                        )
                                }
                            </div>)

                            : (
                                <Stack sx={{marginLeft: 10, marginY: 5, padding: 3}}>

                                    <CircularProgress/>

                                </Stack>
                            ))
                    :
                    (
                        <Stack sx={{marginLeft: 10, marginY: 5, padding: 3}}>

                            uploaded!

                        </Stack>
                    )
            }
        </div>
    )
}
