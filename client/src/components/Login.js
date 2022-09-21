import React from 'react'
import styles from '../asserts/stylesheet/Login.module.css'
import bg1 from '../asserts/images/login-bg-1.png'
import bg2 from '../asserts/images/login-bg-2.png'
export default function Login() {
  return (
    <>

    <div className={styles.container}>
          <div id={styles.left}>
              <img src={bg1} alt="bg1"/>
          </div>
          <div id={styles.mid}>
              <div className={styles.form}>
                  <div id={styles.header}>
                    <p>Sign in to <span>Event Plaza</span></p>
                    <p>Welcome Black! <span>Log in with your account and</span></p>
                    <p>find your favourite event</p>
                  </div>
                  <div id="body">
                  <div className={styles.field}>
                      <label>Email</label>
                      <input className={styles.formInput} type={"email"} placeholder="name@email.com"/>
                    </div>
                    <div className={styles.field}>
                      <label>Password</label>
                      <input className={styles.formInput}  type={"password"} placeholder="password"/>
                      <span id={styles['forgot-password']}>Forgot your password?</span>
                    </div>
                    <div className={styles['button-area']}>
                      <button className={styles.formButton}>Sign In</button>
                      <span>Don't have an account?<span>Register</span></span>
                    </div>
                  </div>
              </div>
          </div>
          <div id={styles.right}>
            <img src={bg2} alt='bg2'/> 
          </div>
    </div>
    </>
  )
}
