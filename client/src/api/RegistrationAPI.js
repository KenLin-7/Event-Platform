import axios from "./axios"

const API = '/api/registration'


export const getParticipants = async (eventId) => {

    const result = await axios.post(API + "/participants", {eventId: eventId})
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