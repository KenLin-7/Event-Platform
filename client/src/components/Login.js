import React, { useEffect, useState } from 'react'
import styles from '../asserts/stylesheet/Login.module.css'
import FormStyles from '../asserts/stylesheet/Form.module.css'
import bg1 from '../asserts/images/login-bg-1.png'
import bg2 from '../asserts/images/login-bg-2.png'
import formValidate from '../utils/validation'
import {signIn} from '../api/UserAPI'
export default function Login() {
  const [account,setAccount] = useState({email:"",password:""})
  const [isValidated,setIsValidated] = useState({email:true,password:true})

  const onChange = (e)=>{
    setAccount({ ...account,[e.target.name]:e.target.value})
    if(!isValidated.email || !isValidated.password) validation()
  }

  // Log in user
  const onClick = ()=>{
    const result = validation()
    if(result.email & result.password){
      signIn(account.email,account.email)
    }
  }

  const validation = ()=>{
    const validate = {
      email: account.email,
      password: account.password
    }
    const result = formValidate(validate)
    setIsValidated(result)  
    return result
  }


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
                  <div className={FormStyles.field}>
                      <label>Email</label>
                      <input className={FormStyles.formInput} type={"email"} placeholder="name@email.com" id="email" onChange={onChange} name="email"/>
                      {
                        !isValidated.email ? (
                          <div className={FormStyles['helper-text']}>
                          <span>Helper Text</span>
                        </div>
                        ):(
                            <></>
                        )
                      }
    
                    </div>

                    <div className={FormStyles.field}>
                      <label>Password</label>
                      <input className={FormStyles.formInput}  type={"password"} placeholder="password" id="password" onChange={onChange} name="password"/>
                      {
                        !isValidated.password ? (
                          <div className={FormStyles['helper-text']}>
                          <span>Helper Text</span>
                        </div>
                        ):(
                            <></>
                        )
                      }
                    </div>
                    <span id={styles['forgot-password']}>Forgot your password?</span>

                    <div className={FormStyles['button-area']}>
                      <button className={FormStyles.formButton} onClick={onClick}>Sign In</button>
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
