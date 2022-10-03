import axios from "./axios"
const API = '/api/event'


export const getEvent = async (eventId)=>{

    const result = await axios.post(API+"/eventDetail", {eventId:eventId})
    return result
}
