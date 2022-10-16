import React,{useContext,useEffect,useState} from 'react'
import { getAvatar, getUser, logout } from '../api/UserAPI'


const UserContext = React.createContext()



export function useUser(){
    return useContext(UserContext)
}

export function UserProvider({children}){
    const [auth,setAuth] = useState(null)
    const [loading,setLoading] = useState(true)
    const [avatar,setAvatar] = useState("")


    // get logged in user email
    const getAuth = async()=>{
        //await getUser().then(res=>{
        getUser().then(res=>{
            setAuth(res.data)
            setLoading(false)
        })

        getAvatar().then(res=>{
            setAvatar(res.data)
            console.log(res.data);
        })
    }


    // logout user 
    const signOut = ()=>{
        setAuth(null)
        logout()
    }
    useEffect(()=>{
       if(localStorage.getItem("token") !=null){
            getAuth() 

       }else{
        setTimeout(() => {
            setLoading(false)
        }, 1000);
       }
    },[auth])



    const value = {
        auth,
        getAuth,
        signOut,
        loading,
        avatar
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}