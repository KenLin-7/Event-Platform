import axios from "axios"

const instance = axios.create({
    baseURL:'http://localhost:8080',
    headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
})

instance.interceptors.request.use(request=>{
    request.headers.Authorization =`Bearer ${localStorage.getItem("token")}`;
    return request
})

instance.interceptors.response.use(response=>{
    const token = response.headers['access_token']
    if(token!=null){
        localStorage.setItem("token",response.headers['access_token'].split("Bearer  ")[1])
    }
    console.log(response.data);
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
                console.log(err.response.data);

                break
            case 500:
                // TODO Internal server error
                console.log(err.response.data);

                break
            default:
                // TODO 
                console.log(err.response.data);

                
        }
    }
})

export default instance