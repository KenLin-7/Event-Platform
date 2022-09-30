import React,{useContext,useEffect,useState} from 'react'
import { getUser, logout } from '../api/UserAPI'


const UserContext = React.createContext()



export  function useUser(){
    return useContext(UserContext)
}

export function UserProvider({children}){
    const [auth,setAuth] = useState(null)

    // get logged in user email
    const getAuth = async()=>{
        await getUser().then(res=>{
            setAuth(res.data)
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
        signOut
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

