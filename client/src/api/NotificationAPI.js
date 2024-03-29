import axios from "./axios"
const API = '/api/notification'


export const getNotifications = async ()=>{
    const result = await axios.get(API+"/all")
    return result.data
}

export const createNotification = async(reciever,message,eventId,status)=>{
    const result = await axios.post(API+"/create",{email:reciever,message:message,status:status,eventId:eventId})
    return result.data
}

export const updateNotification = async(id)=>{
    const result = await axios.post(API+"/update",{id:id})
    return result.data
}

export const getCount = async()=>{
    const result = await axios.get(API+"/total")
    return result.data
}

export const updateAll = async(notifications)=>{
    console.log(notifications);
    const result = await axios.post(API+"/update/all",{notifications:notifications})
    return result.data
}

export const getUserConfirmedEvent = async()=>{
    const result = await axios.post(API+"/confirmed/event")
    return result.data
}

export const createAll = async(notificaition)=>{
    const result = await axios.post(API+"/create/notification/all",notificaition)
}