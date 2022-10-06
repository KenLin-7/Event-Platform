import { async } from "@firebase/util"
import axios from "./axios"
const API = '/api/registration'


export const getParticipants = async (eventId)=>{
    const result = await axios.post(API+"/participants", {eventId:eventId})
    return result
}

export const getAllRegistrationRequests = async () => {
    const result = await axios.get(API+"/getAllRegistrationRequests")
    console.log(result)
    return result
}
