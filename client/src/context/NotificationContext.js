import React,{useContext,useEffect,useState} from 'react'
import * as SockJS from 'sockjs-client';
import { useUser } from './UserContext';
import Button from '@mui/material/Button';
import { SnackbarProvider} from 'notistack';
import Notification from '../components/Notification';


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
    const [currentNotification,setCurrentNotification] = useState("")
    const [connected,setConnected] = useState(false)



    // connect to web socket to recieve notification
    const socketConn  = ()=>{
        const socket = new SockJS(host)
        stompClient = Stomp.over(socket)
        stompClient.connect({},onConnected,onError)
    }


    // Mock-data get join eventID
    let eventIds = ["1","2","3"]


    // connect socket and subscribe the default
    const onConnected = ()=>{
        setConnected(true)
        // subscribe user socket to recieve user private notifications
        stompClient.subscribe(`/user/${auth}/notification`,handlePayload)
        if(eventIds.length>0 && auth ==="ken@test.com"){
            eventIds.forEach(eventId => {
                stompClient.subscribe(`/event/${eventId}/notification`,handlePayload)
            });
        }
    }

    // handle notificaition payload 
    const handlePayload = (payload)=>{
        setCurrentNotification(JSON.parse(payload.body))
        // push currentNotificaiton to list
        notifications.push(payload.body)
        setNotifications([...notifications])
    }

    // Handle socket error
    const onError = ()=>{

    }

    // disconnect socket
    const disconnect = ()=>{
        if(stompClient){
            stompClient.disconnect()
        } 
    }

    // Subscribe event socket to recieve event update notification
    const subscribeEvent = (eventId)=>{
        if(stompClient){ 
            stompClient.subscribe(`/event/${eventId}/notification`)
        }       

    }


    // notify participant if event information has been upadated
    const sendEventMessage = (eventId,content)=>{
        if(stompClient){
            let notification = {
                message:content,
                eventId:eventId
            }
            stompClient.send(`/event/${eventId}/notification`,{},JSON.stringify(notification))
        }

    }


    // notify user if resgiration has been rejected/accepted
    const sendUserMessage = (email,message)=>{
        if(stompClient){
            let notification = {
                message:message,
                email:email
            }
            stompClient.send(`/user/${email}/notification`,{},JSON.stringify(notification))
        }
    }



    useEffect(()=>{
        if(!connected && auth != null){
            socketConn()
        } 
    },[auth])

    const value = {
        notifications,
        subscribeEvent,
        sendEventMessage,
        currentNotification,
        setCurrentNotification,
        sendUserMessage,
        disconnect,
        socketConn
    }

    return (

            <NotificationContext.Provider value={value}>
            <SnackbarProvider maxSnack={3} 
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                    <Notification/>
                        {children}
                    </SnackbarProvider>
            </NotificationContext.Provider>

    )
}
