import React,{useContext,useEffect,useState} from 'react'
import { getUser, logout } from '../api/UserAPI'


const UserContext = React.createContext()



export function useUser(){
    return useContext(UserContext)
}

export function UserProvider({children}){
    const [auth,setAuth] = useState(null)

    useEffect(()=>{
        if(localStorage.getItem("token") !=null) getAuth()
     },[])

    // get logged in user email
    const getAuth = async()=>{
        //await getUser().then(res=>{
        getUser().then(res=>{
            setAuth(res.data)
        })
    }


    // logout user 
    const signOut = ()=>{
        setAuth(null)
        logout()
    }
   



    const value = {
        auth,
        getAuth,
        signOut
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}