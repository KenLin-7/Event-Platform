import { useState } from "react";
import {ref,uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import storage from '../firebase/storage'

// handle upload image to firebase storage
function useUpload(){
    const [imageURL,setImageURL] = useState("")
    const [progress,setProgress] = useState(0)
    const [buffer,setBuffer] = useState(10)


    const uploadImage = (image,foldername)=>{

        // select different folder(avatar/event) to store image
        const imageRef = ref(storage,`${foldername}/${image.name+new Date().getTime()}`)

        const uploadTask = uploadBytesResumable(imageRef,image)


        // upload process
        uploadTask.on("state_changed",(snapshot)=>{
            // show progress
            const progress = Math.floor(snapshot.bytesTransferred/snapshot.totalBytes) *100
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            setProgress(progress + diff)
            setBuffer(progress + diff2)
        },(err)=>{
    
        },()=>{
            // Upload completed successfully, return download url 
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                console.log(downloadURL);
                setImageURL(downloadURL)
            })
        })
    }


    return {imageURL ,uploadImage,progress,buffer}
}
export default useUpload