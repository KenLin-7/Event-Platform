import React,{useContext,useEffect,useState} from 'react'
import { getUser } from '../api/UserAPI'


const UserContext = React.createContext()



export  function useUser(){
    return useContext(UserContext)
}

export function UserProvider({children}){
    const [user,setUser] = useState(null)
    

    useEffect(()=>{
        
        const getCurrentUser = async ()=>{
            setUser(await getUser())
        }
       if(localStorage.getItem("token") !=null) getCurrentUser()
    },[])

    const value = {
        user
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

