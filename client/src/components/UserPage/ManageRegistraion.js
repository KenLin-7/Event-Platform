import React, { useEffect, useState } from 'react'
import styles from '../../asserts/stylesheet/UserPage/ManageRegistration.module.css'
import usePagination from "../Pagination";
import {
  Pagination,
  Avatar,
  CircularProgress
} from "@mui/material";
import { getCurrentUserEvents } from '../../api/EventAPI'
import { getAllRegistrationRequests } from '../../api/RegistrationAPI'
import { useNotification } from '../../context/NotificationContext';

const ManageRegistraion = () => {
  const [events, setEvents] = useState([]);
  const [flag, setFlag] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 2;
  const count = Math.ceil(events.length / PER_PAGE);
  const _DATA = usePagination(events, PER_PAGE);
  const {sendUserMessage} = useNotification()


  useEffect(() => {
    const fetch = () => {
      setFlag(true)
      getCurrentUserEvents().then((data) => {
        const fetchedList = [];

        const allEvents = data.data
        for (let i = 0; i < allEvents.length; i++) {
          const requests = allEvents[i].registrationList


          if (requests.length !== 0) {
            for (let j = 0; j < requests.length; j++) {
              if (requests[j].status === "pending") {
                fetchedList.push(requests[j])
              }
            }
          }
        }

        setEvents(fetchedList)

        setFlag(false)
      })
    }
    fetch();
  }, [])

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  // Add use email
  const onApprovedClick = (email)=>{
      sendUserMessage(email,"Your registration has been confirmed")
  }

  const onRejectClick = (email)=>{
    sendUserMessage(email,"Your registration has been rejected")
  }

  return (
    <div className={styles['manage-registration-container']}>
      <div className={styles['manage-registration-title']}>
        Manage Registraion
      </div>
      {
        flag
          ?
          (
            <CircularProgress className={styles['progress-control']}/>
          )
          :
          (
            <>
              {
                events.length === 0
                  ?
                  (
                    <div className={styles['no-data-notification']}>No requests</div>
                  )
                  :
                  (
                    <>
                      <div className={styles['manage-registration-content']}>
                        {
                          _DATA.currentData().map((data, index) => {
                            return (
                              <div className={styles['registraion-notification-card']} key={index}>

                                <div className={styles['requester-container']}>
                                  <div className={styles['requester-avatar']}>
                                    <Avatar alt="Remy Sharp" src={data.requester.avatar} sx={{ height: 60, width: 60 }} />
                                  </div>

                                  <div className={styles['requester-msg-section']}>
                                    <div className={styles['requester-nickname']}>
                                      {data.requester.nickname}
                                    </div>
                                    <div className={styles['requester-msg']}>
                                      is requesting to join your event:
                                    </div>
                                    <div className={styles['display-location']}>
                                      {data.event.title}
                                      <p>at：{data.event.location}</p>
                                    </div>
                                  </div>

                                  <div className={styles['group-btn']}>
                                    <div className={styles['approve-btn']} onClick={()=>onApprovedClick(data.requester.email)}>
                                      Approve
                                    </div>
                                    <div className={styles['reject-btn']} onClick={()=>onRejectClick(data.requester.email)}>
                                      Reject
                                    </div>
                                  </div>

                                </div>

                              </div>
                            )
                          })
                        }
                      </div>
                      <Pagination
                        count={count}
                        color="primary"
                        onChange={handleChange}
                        page={page}
                        className={styles["pagination"]}
                      />
                    </>
                  )
              }

            </>
          )
      }
    </div>
  )
}

export default ManageRegistraion