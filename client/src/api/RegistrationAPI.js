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


export const createRegistration = async (eventId) => {

    const result = await axios.post(API + "/create", {eventId: eventId})
    return result
}

export const deleteRegistration = async (eventId) => {
    const result = await axios.post(API + "/delete", {eventId: eventId})
    return result
}

export const approveRegistration = async (registrationId) => {
    const result = await axios.post(API + "/approveRegistration", {registrationId: registrationId})
    return result
}

export const rejectRegistration = async (registrationId) => {
    const result = await axios.post(API + "/rejectRegistration", {registrationId: registrationId})
    return result
}