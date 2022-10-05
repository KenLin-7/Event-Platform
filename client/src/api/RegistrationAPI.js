import axios from "./axios"
const API = '/api/registration'


export const getParticipants = async (eventId)=>{

    const result = await axios.post(API+"/participants", {eventId:eventId})
    return result
}
