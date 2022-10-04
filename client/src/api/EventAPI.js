import axios from "./axios"
const API = '/api/event'




export const postEvent = async (event)=>{
    const result = await axios.post(API+"/create",event)
    return result
}


export const getEvent = async (eventId)=>{

    const result = await axios.post(API+"/eventDetail", {eventId:eventId})
    return result
}
