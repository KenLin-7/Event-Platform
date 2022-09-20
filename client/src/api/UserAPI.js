import axios from "./axios"
const API = '/api/user'


export const signIn = async (email,password)=>{
    const formData = new FormData()
    formData.append("username","13@qq.com")
    formData.append("password","123")
    const result = await axios.post("/login",formData,{headers:{"content-type":"application/x-www-form-urlencoded"}})
    
    return result
}


export const getInfo  = async (email)=>{
    const result = await axios.get("/test/info",{params:{email}})
    return result 
}

export const getUser = async ()=>{
    const result = await axios.post(API+"/current")
    return result 
}

export const logout = async()=>{
    localStorage.removeItem("token")
}