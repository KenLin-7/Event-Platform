import React from 'react'
import styles from '../asserts/stylesheet/Register.module.css'
import bg from '../asserts/images/register-bg.png'
export default function Register() {
  return (
    <div className={styles.container}>
        <div id={styles['left']}>
            <div>
                <img src={bg} alt="bg"/>
            </div>
        </div>
        <div id={styles['right']}>
            <div className={styles['form']}>
                <div id={styles["header"]}>
                    <div id={styles["first"]}>
                        <span>START FOR FREE</span>
                    </div>
                    <div id={styles["second"]}>
                        <span >Sign up to </span>
                        <span >Event Plaza</span>
                    </div>
                    <div id={styles["third"]}>
                        <span>Already have an account?</span>
                        <span>Log in</span>
                    </div>
                </div>
                <div id={styles["body"]}>
                    <div>
                        <input className={`${styles.formInput} ${styles.user_ic}`}  placeholder='Nickname'/>
                        <input className={`${styles.formInput} ${styles.phone_ic}`} placeholder='Phone Number'/>
                    </div>
                    <div>
                        <input className={`${styles.formInput} ${styles.email_ic}`} placeholder='name@email.com' type="email"/>
                        <input className={`${styles.formInput} ${styles.password_ic}`} placeholder='Password' type="password"/>
                    </div>
                    <div className={styles['button-area']}>
                        <button className={styles.formButton}>Create an account</button>
                        <span><span>Privacy Policy </span>and <span>Terms of service</span> apply</span>
                    </div>

                </div>

            </div>
        </div>
    </div>
  )
}
