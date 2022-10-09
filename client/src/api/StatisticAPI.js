import axios from "./axios"
const API = '/api/statistic'

export const getStatistic = ()=>{
    const result = axios.get(API+"/get")
    return result
}