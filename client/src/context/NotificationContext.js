import React,{useContext,useEffect,useState} from 'react'
import * as SockJS from 'sockjs-client';
import { useUser } from './UserContext';
const Stomp = require('stompjs')
// import Stomp from 'stomp-websocket'
const NotificationContext = React.createContext()
const host = "http://localhost:8080/ws/socket"
var stompClient = null

export  function useNotification(){
    return useContext(NotificationContext)
}


export const NotificationProvider = ({children})=>{
    const {auth} = useUser()
    const [notifications,setNotifications] = useState([]);
    const [connected,setConnected] = useState(false)
    const socketConn  = ()=>{
        const socket = new SockJS(host)
        stompClient = Stomp.over(socket)
        stompClient.connect({},onConnected,onError)
    }

    const onConnected = ()=>{
        setConnected(true)
        stompClient.subscribe(`/user/ken@test.com/notification`,payload=>{
            console.log(payload);
        })
        console.log(auth);
    }

    const onError = ()=>{

    }




    useEffect(()=>{
        if(!connected && auth != null){
            socketConn()
        } 

    },[auth])

    // expose attributes
    const value = {
        notifications,
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}