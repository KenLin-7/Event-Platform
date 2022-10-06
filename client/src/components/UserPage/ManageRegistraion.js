import React, { useEffect, useState } from 'react'
import styles from '../../asserts/stylesheet/UserPage/ManageRegistration.module.css'
import usePagination from "../Pagination";
import {
  Pagination,
  Avatar
} from "@mui/material";

const messagesTest = [
  { id: 1, nickname: "woshinidie", email: "woshinidie@123.com" },
  { id: 2, nickname: "woshinidie1", email: "woshinidie@123.com" },
  { id: 3, nickname: "woshinidie2", email: "woshinidie@123.com" },
  { id: 4, nickname: "woshinidie3", email: "woshinidie@123.com" },
  { id: 5, nickname: "woshinidie4", email: "woshinidie@123.com" },
]

const ManageRegistraion = () => {
  const [msgs, setMsgs] = useState([]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 2;
  const count = Math.ceil(messagesTest.length / PER_PAGE);
  const _DATA = usePagination(messagesTest, PER_PAGE);


  useEffect(() => {
    const fetch = () => {

    }

    fetch()
  }, [])

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div className={styles['manage-registration-container']}>
      <div className={styles['manage-registration-title']}>
        Manage Registraion
      </div>
      <div className={styles['manage-registration-content']}>
        {
          _DATA.currentData().map((data, index) => {
            return (
              <div className={styles['registraion-notification-card']} key={index}>

                <div className={styles['requester-container']}>
                  <div className={styles['requester-avatar']}>
                    <Avatar alt="Remy Sharp" src="" sx={{ height: 60, width: 60 }} />
                  </div>

                  <div className={styles['requester-msg-section']}>
                    <div className={styles['requester-nickname']}>
                      {data.nickname}
                    </div>
                    <div className={styles['requester-msg']}>
                      is requesting
                    </div>
                  </div>

                  <div className={styles['group-btn']}>
                    <div className={styles['approve-btn']}>
                      Approve
                    </div>
                    <div className={styles['reject-btn']}>
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
    </div>
  )
}

export default ManageRegistraion