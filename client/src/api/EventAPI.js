import { async } from "@firebase/util"
import axios from "./axios"
const API = '/api/event'

export const getCurrentUserEvents = async (keyword) => {
  const result = await axios.get(API + "/currentUserEvents")
  return result
}

export const getAllEvent = async () => {
  const result = await axios.get(API + "/getAllEvent");
  return result
}