import axios from "./axios"
const API = '/api/notification'


export const getNotifications = async ()=>{
    const result = await axios.get(API+"/all")
    return result.data
}

export const createNotification = async(reciever,message,status)=>{
    const result = await axios.post(API+"/create",{email:reciever,message:message,status:status})
    return result.data
}

export const updateNotification = async(id)=>{
    const result = await axios.get(API+"/update",id)
}

export const getCount = async()=>{
    const result = await axios.get(API+"/total")
    return result.data
}

export const updateAll = async(notifications)=>{
    const result = await axios.post(API+"/update/all",{notifications:notifications})
    return result.data
}