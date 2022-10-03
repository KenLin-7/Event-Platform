import axios from "./axios"
const API = '/api/event'


export const getEvent = async (eventId)=>{
    const result = await axios.get(API+"/eventDetail",eventId)
    console.log(232323232323);
    return result
}