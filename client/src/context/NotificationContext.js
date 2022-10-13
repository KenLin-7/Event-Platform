import React,{useContext,useEffect,useState} from 'react'
import * as SockJS from 'sockjs-client';
import { useUser } from './UserContext';
import { SnackbarProvider} from 'notistack';
import Notification from '../components/Notification';
import { createNotification, getUserConfirmedEvent, updateAll,createAll } from '../api/NotificationAPI';
import { getNotifications,updateNotification } from '../api/NotificationAPI';
const Stomp = require('stompjs')
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
    const [sent,setSent] = useState(false)
    const [count,setCount] = useState(0)


    // connect to web socket to recieve notification
    const socketConn  = ()=>{
        const socket = new SockJS(host)
        stompClient = Stomp.over(socket)
        stompClient.connect({},onConnected,onError)
    }



    // connect socket and subscribe the default
    const onConnected = ()=>{
        
        if(auth !=null && stompClient !=null){
            setConnected(true)
            // subscribe user socket to recieve user private notifications
            // stompClient.debug = null
            stompClient.subscribe(`/user/${auth}/notification`,handlePayload)
            getUserConfirmedEvent().then(res=>{
                res.forEach(id => {
                    subscribeEvent(id)
                });
            })
        }
 
    }

    // handle notificaition payload 
    const handlePayload = (payload)=>{
        try{
            setCurrentNotification(JSON.parse(payload.body).message)
        }catch(err){
            setCurrentNotification(payload.body)
        }
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
            stompClient.subscribe(`/event/${eventId}/notification`,handlePayload)
        }       
    }


    // TODO Unhandled received MESSAGE: MESSAGE
    // notify participant if event information has been upadated
    const sendEventMessage = (eventId,message)=>{
        if(stompClient){
            let notification = {
                message:message,
                eventId:eventId
            }
            stompClient.send(`/event/${eventId}/notification`,{},JSON.stringify(notification))
            createAll(notification)
            setSent(true)
        }
    }

        // notify user if resgiration has been rejected/accepted
        const sendUserMessage = (email,eventId,message)=>{
            if(stompClient){
                let notification = {
                    message:message,
                    email:email,
                    eventId:eventId
                }
                stompClient.send(`/user/${email}/notification`,{},JSON.stringify(notification))
                createNotification(email,message,eventId,"status")
                setSent(true)
            }
        }


    // Mark all notification as read
    const clearAll = ()=>{
        if(notifications.length > 0){
            updateAll(notifications).then((res)=>{
                setNotifications([])
                setCount(0)
            })
        }
    }

    // Mark notfication as read 
    const clear = (notficationId,index)=>{

        updateNotification(notficationId).then((res)=>{
            setNotifications(notifications.slice(index,index))
            setCount(notifications.length)
        })

    }






    useEffect(()=>{
        console.log(notifications);

        if(!connected && auth != null){
            socketConn()
        } 
        async function fetch(){
            await getNotifications().then((res)=>{
                setNotifications(res)
                setCount(res.length)
                })
        }

        if(auth!=null||sent){
            console.log("test");
            fetch()
            setSent(false)
        }


    },[auth,sent])

    const value = {
        notifications,
        subscribeEvent,
        sendEventMessage,
        currentNotification,
        setCurrentNotification,
        sendUserMessage,
        disconnect,
        socketConn,
        count,
        clearAll,
        clear
        
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
