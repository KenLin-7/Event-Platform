import React,{useContext,useEffect,useState} from 'react'
import { getUser, logout } from '../api/UserAPI'


const UserContext = React.createContext()



export function useUser(){
    return useContext(UserContext)
}

export function UserProvider({children}){
    const [auth,setAuth] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        if(localStorage.getItem("token") !=null) getAuth()
     },[])

    // get logged in user email
    const getAuth = async()=>{
        //await getUser().then(res=>{
        getUser().then(res=>{
            setAuth(res.data)
            setLoading(false)
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
       }
    },[auth])



    const value = {
        auth,
        getAuth,
        signOut,
        loading
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}