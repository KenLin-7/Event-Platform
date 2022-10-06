import { async } from "@firebase/util"
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

export const getCurrentUserEvents = async () => {
  const result = await axios.get(API + "/currentUserEvents")
  return result
}

export const getAllEvent = async () => {
  const result = await axios.get(API + "/getAllEvent");
  return result
}

export const getUserRegistrationEvents = async () => {
  const result = await axios.get(API + "/getUserRegistrationEvents");
  return result
}
