import React, {useEffect, useState} from 'react'
import useUpload from '../../hook/useUpload'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import formValidate from '../../utils/validation';
import {remove} from '../../api/UserAPI'
import {Button, Card, CircularProgress, Input, Stack, Typography} from "@mui/material";

export default function UploadImage(props) {

    const {imageURL, uploadImage, progress, buffer} = useUpload()
    const [image, setImage] = useState("")
    const [uploadingFlag, setUploadingFlag] = useState(4)


    const onClick = () => {
        setUploadingFlag(2)
        uploadImage(image, "event")
        props.onFlag(uploadingFlag)
        // remove()
    }

    const onInputClick = (e) => {
        props.onFlag(uploadingFlag)
    }

    const onChange = (e) => {
        setUploadingFlag(1)
        setImage(e.target.files[0])

    }

    useEffect(() => {

        if (uploadingFlag === 2) setUploadingFlag(3)
        props.onImage(imageURL)
        props.onFlag(uploadingFlag)
    }, [imageURL],[uploadingFlag])


    return (
        <div>
            <Input sx={{marginLeft: 2, marginY: 2}} type={'file'} onChange={onChange} onClick={onInputClick}
                   accept="image/*"/>
            <Button sx={{padding: 1, marginLeft: 4, marginY: 2}} variant={"contained"} onClick={onClick}>submit</Button>
            <Typography sx={{marginLeft: 2}}> Remember to click submit, or the image will not be kept</Typography>

            {
                props.img && uploadingFlag===4?
                    <Stack sx={{padding: 1}}>
                        <img src={props.img} alt="event"/>
                    </Stack>
                    :

                (uploadingFlag === 1 ?


                        <Stack sx={{padding: 1}}>
                            <img src={URL.createObjectURL(image)} alt="event"/>

                        </Stack>
                        :

                        uploadingFlag === 2 ?
                            <Stack sx={{padding: 1, marginLeft: 20, marginTop: 5, marginBottom: 8}}>
                                <CircularProgress/>
                            </Stack>

                            :

                            uploadingFlag === 3 ?

                                <Stack sx={{padding: 1, marginLeft: 20, marginTop: 5, marginBottom: 8}}>
                                    <Typography> upload successful </Typography>
                                </Stack>
                                :
                                <Stack></Stack>
                )
            }
        </div>
    )
}
