import axios from "axios"
import { Alert } from "@mui/material";
import { Navigate } from "react-router-dom";
const instance = axios.create({
    baseURL:'http://localhost:8080',
    headers:'content-type:application/json'
})

instance.interceptors.request.use(request=>{
    request.headers['content-type'] = 'application/json'
    if(localStorage.getItem("token") !== null){
        request.headers.Authorization =`Bearer ${localStorage.getItem("token")}`;

    }
    return request
})

instance.interceptors.response.use(response=>{
    const token = response.headers['access_token']
    if(token!=null){
        localStorage.setItem("token",response.headers['access_token'].split("Bearer  ")[1])
<<<<<<< HEAD
    };
    console.log(response.data);
=======
    }
>>>>>>> master
    return response.data
},err=>{
    if(err.response){
        switch (err.response.status){
            case 404:
                // TODO NotFound
                console.log(err.response.data);
                break
            case 401:
                // TODO UnAuthroised 
                console.log(err.response.data);
                break
            case 403:
                // TODO Forbbien 
                console.log("No authorities");

                break
            case 500:
                // TODO Internal server error
                console.log(err.response.data);

                break
            default:
                // TODO 
                console.log(err.response.data);

        }
        return err.response.data
    }
})

export default instance