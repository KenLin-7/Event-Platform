import axios from "./axios"
const API = '/api/event'

export const search = async (keyword)=>{
    const result = await axios.get(API+`/search/${keyword}`)
    return result
}

export const searchEventByCategory = async (category)=>{
    const result = await axios.get(API+`/search/all/${category}`)
    return result
}

export const searchEventByCategoryAndKeyword = async (keyword, category)=>{
    const result = await axios.get(API+`/search/${keyword}/${category}`)
    return result
}

export const getLatestEvents = async ()=>{
    const result = await axios.get(API+`/latestEvent`)
    return result
}