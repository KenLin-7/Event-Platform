import React, { useEffect,useState } from 'react'
import styles from '../../asserts/stylesheet/Message.module.css'
import testImage from '../../asserts/images/test-image.png'
import { getNotificaitonEvent } from '../../api/EventAPI'
import { Skeleton} from '@mui/material'
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { useNotification } from '../../context/NotificationContext'
export default function MessageNotification({notification,closeDrawer,index}) {
  const [loading, setLoading] = useState(true)
  const [event,setEvent] = useState("")
  const navigate = useNavigate()
  const {auth} = useUser()

  useEffect(()=>{
    if(notification!== null){
      getNotificaitonEvent(notification.eventId).then((res)=>{
        setEvent(res)
        setLoading(false)
      })
    }

  },[])

  const navToDetail = ()=>{
  if(event.status !== "2"){
    if(auth === event.ownerEmail){
      navigate("/user-page")
    }else{
      navigate(`/event/detail/${notification.eventId}`)
    }
    closeDrawer()
  }


  }

  return (
    <div className={styles.container} onClick={navToDetail}>
      <div className={styles.message}>
          <span className={styles.title}>{notification.message}</span>
      </div>
      {
        loading ? (
          <Skeleton height={150}/>
        ):(      
          <div className={styles.event} >
            <img src={event.image} style={{width:'100px',height:'100px'}} alt='Event cover'/>
            <div className={styles.content}>
              <span className={styles.title}>{event.title}</span>
              <span className={styles.description}>{event.description}</span>
            </div>
          </div>
      )
      }

      <div className={styles.time}>
        {dayjs(notification.createdTime).format("ddd,MMM D,YYYY h:mm A")}
      </div>
    </div>
  )
}
