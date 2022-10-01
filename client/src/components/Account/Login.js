import React, { useState } from 'react'
import styles from '../../asserts/stylesheet/Login.module.css'
import FormStyles from '../../asserts/stylesheet/Form.module.css'
import bg1 from '../../asserts/images/login-bg-1.png'
import bg2 from '../../asserts/images/login-bg-2.png'
import formValidate from '../../utils/validation'
import {signIn} from '../../api/UserAPI'
import { Link,Navigate } from 'react-router-dom'
import { Alert } from '@mui/material'
import {useUser} from '../../context/UserContext'

export default function Login() {
  const [account,setAccount] = useState({email:"",password:""})
  const [isValidated,setIsValidated] = useState({email:true,password:true})
  const [emailError,setEmailError] = useState("Please enter your email")
  const [passwordError,setPasswordError] = useState("Please enter your password")
  const [errorMsg,setErrorMsg] = useState("")
  const {getAuth,auth} = useUser();

  // handle input change 
  const onChange = (e)=>{
    setAccount({ ...account,[e.target.name]:e.target.value})
    if(!isValidated.email || !isValidated.password) validation()
  }

  // Log in user
  const onClick = ()=>{
    const result = validation()
    if(result.email && result.password){
       signIn(account.email,account.password).then((data)=>{
          if(data.code === "401") setErrorMsg(data.msg)
          // set logged in user
          else getAuth()
       })
    }
  }

  // validation form
  const validation = ()=>{
    const validate = {
      email: account.email,
      password: account.password
    }
    const result = formValidate(validate)
    setIsValidated(result)  

    // setting helper text
    if(account.email !== "")     setEmailError("Please enter correct email") 
    if(account.password !== "")  setPasswordError("Please enter correct password format") 

    return result
  }

  // useEffect(()=>{

  //   console.log(auth);
  // },[auth])


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
                      <input className={!isValidated.email? (FormStyles['formInput-error']):(FormStyles.formInput)} type={"email"} placeholder="name@email.com" id="email" onChange={onChange} name="email"/>
                      {
                        !isValidated.email ? (
                          <div className={FormStyles['helper-text']}>
                          <span>{emailError}</span>
                        </div>
                        ):(
                            <></>
                        )
                      }
                    </div>

                    <div className={FormStyles.field}>
                      <label>Password</label>
                      <input className={!isValidated.password? (FormStyles['formInput-error']):(FormStyles.formInput)}  type={"password"} placeholder="password" id="password" onChange={onChange} name="password"/>
                      {
                        !isValidated.password ? (
                          <div className={FormStyles['helper-text']}>
                          <span>{passwordError}</span>
                        </div>
                        ):(
                            <></>
                        )
                      }
                    </div>
                    <div>
                      <span id={styles['forgot-password']}><Link to="/forgotPassword">Forgot your password?</Link></span>
                    </div>

                    <div className={FormStyles['button-area']}>
                      {errorMsg && <Alert severity={"error"} sx={{marginBottom:"15px",width:"90%"}}>{errorMsg}</Alert>}
                      <button className={FormStyles.formButton} onClick={onClick}>Sign In</button>
                      <span className={styles['register-link']}>Don't have an account?
                        <Link to="/register"><span className={FormStyles.link}>Register</span></Link>
                      </span>
                    </div>
                    {
                      auth && <Navigate to="/" replace={true}/>
                    }
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