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
export const profile = async (email)=>{
    const result = await axios.post(API+'/profile', email)
    return result 
}

export const updateUser = async (user)=>{
    const result = await axios.post(API+"/updateUser",user)
    return result 
}

export const updateUserEmail = async (email,code)=>{
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("code", code);
    const result = await axios.post(API+'/updateEmail', {email:email, code:code})
    return result 
}

export const sendEmail = async (email)=>{
    const result = await axios.post(API+'/sendEmail', email)
    console.log("email:"+email);
    return result 
}

export const updateUserPassword = async (password,code)=>{
    const result = await axios.post(API+'/updatePassword', {password:password,code:code})
    return result 
}

export const updateUserAvatar = async (avatar)=>{
    const result = await axios.post(API+"/updateAvatar", avatar)
    return result 
}

export const forgotPassword = async (email,code)=>{
    const result = await axios.post(API+"/forgotPassword", {email:email,code:code})
    return result 
}
export const resetPassword = async (password)=>{
    const result = await axios.post(API+"/resetPassword", password)
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

export const remove = async()=>{
    await axios.get(API+"/remove/role")
}

export const getUserInfo = async () => {
    const result = await axios.get(API + "/loggedIn-userInfo")
    return result;
}