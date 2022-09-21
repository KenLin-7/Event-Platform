import axios from "./axios"
const API = '/api/user'

export const signIn = async (email,password)=>{
    const formData = new FormData()
    formData.append("username",email)
    formData.append("password",password)
    const result = await axios.post("/login",formData,{headers:{"content-type":"application/x-www-form-urlencoded"}})
    return result
}

export const signUp = async (user)=>{
    const result = await axios.post(API+"/register",user)
    return result
}


export const getInfo  = async (email)=>{
    const result = await axios.get("/test/info",{params:{email}})
    return result 
}

export const getUser = async ()=>{
    const result = await axios.post(API+"/current").then(()=>{
        console.log("user getted");
    })
    return result 
}

export const logout = async()=>{
    localStorage.removeItem("token")
}