import React,{useState} from 'react'
import styles from '../../asserts/stylesheet/Register.module.css'
import FormStyles from '../../asserts/stylesheet/Form.module.css'
import formValidate from '../../utils/validation'
import bg from '../../asserts/images/register-bg.png'
import { signUp } from '../../api/UserAPI'
import { Link } from 'react-router-dom'
import { Alert } from '@mui/material'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {

    const [account,setAccount] = useState({
        nickname:"",
        phone:"",
        password:"",
        email:"",
    })

    const [isValidated,setIsValidated] = useState({
        nickname:true,
        phone:true,
        password:true,
        email:true,
    })

    const navigate = useNavigate();
    const [emailError,setEmailError] = useState("Please enter your email")
    const [passwordError,setPasswordError] = useState("Please enter your password")
    const [phoneError,setPhoneError] = useState("Please enter your phone")
    const [message,setMessage] = useState({show:false,content:"",severity:""})
    const [loading,setLoading] = useState(false)

    const validation = ()=>{
        const validate = {
          email: account.email,
          password: account.password,
          phone: account.phone,
          nickname: account.nickname
        }
        const result = formValidate(validate)
        // setting helper text
        if(account.email !== "")     setEmailError("Please enter correct email") 
        if(account.password !== "")  setPasswordError("Please enter correct password format")         
        if(account.phone !== "")  setPhoneError("Please enter correct phone") 
        setIsValidated(result)  
        return result
    }

    const onClick = ()=>{
        const result = validation()
        if(result.email && result.password && result.nickname && result.phone ){
            setLoading(true)
            signUp(account).then((res)=>{
                if(res.code === "200"){
                    setMessage({show:true,message:"Register succcessfully",severity:"success"})
                    setLoading(false)
                }else{
                    setMessage({show:true,message:"Email was taken",severity:"error"})
                    setLoading(false)

                }
            })
        }
    }

    // Handle form change
    const onChange = (e)=>{
        setAccount({ ...account,[e.target.name]:e.target.value})
        if(!isValidated.email || !isValidated.password
            || !isValidated.nickname || !isValidated.phone
            ) validation()
    }
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
                        <Link to={"/login"}><span className={FormStyles.link}>Log in</span></Link>
                    </div>
                </div>
                <div id={styles["body"]}>
                    <div>
                        <div className={`${FormStyles.field} ${styles.nickname}`}>
                            <input className={!isValidated.nickname? 
                                (`${FormStyles['formInput-error']} ${FormStyles.user_ic}`):(`${FormStyles.formInput} ${FormStyles.user_ic}`)}  
                             placeholder='nickname' name='nickname' onChange={onChange}/>
                            {
                               !isValidated.nickname &&                        
                               <div className={FormStyles['helper-text']}>
                                <span>Please enter a nickname</span>
                               </div>
                            }
   
                        </div>
                        <div className={`${FormStyles.field} ${styles.phone}`}>
                            <input className={!isValidated.phone? 
                                (`${FormStyles['formInput-error']} ${FormStyles.phone_ic}`):(`${FormStyles.formInput} ${FormStyles.phone_ic}`)} 
                            placeholder='phone number' name='phone' onChange={onChange}/>
                            {
                               !isValidated.phone &&                        
                               <div className={FormStyles['helper-text']}>
                               <span>{phoneError}</span>
                               </div>
                            }
                        </div>
         
                    </div>

                    <div>
                        <div className={FormStyles.field}>
                            <input className={!isValidated.email? 
                                (`${FormStyles['formInput-error']} ${FormStyles.email_ic}`):(`${FormStyles.formInput} ${FormStyles.email_ic}`)} 
                            placeholder='name@email.com' type="email" name='email' onChange={onChange}/>
                            {
                               !isValidated.email &&                        
                               <div className={FormStyles['helper-text']}>
                               <span>{emailError}</span>
                               </div>
                            }
                        </div>
                        <div className={FormStyles.field}>
                            <input className={!isValidated.password? 
                                (`${FormStyles['formInput-error']} ${FormStyles.password_ic}`):(`${FormStyles.formInput} ${FormStyles.password_ic}`)} 
                            placeholder='password' type="password" name='password' onChange={onChange}/>
                            {
                               !isValidated.password &&                        
                               <div className={FormStyles['helper-text']}>
                               <span>{passwordError}</span>
                               </div>
                            }
                        </div>
                    </div>
                    {message.show && <Alert severity={message.severity} sx={{marginBottom:"15px"}}>{message.message}</Alert>} 
                    <div className={FormStyles['button-area']}>
                        <button className={FormStyles.formButton} onClick={onClick} disabled={loading}>
                            {loading? (<CircularProgress color='inherit' size={25}/>):("Create an account")}
                        </button>
                        <span><span>Privacy Policy </span>and <span>Terms of service</span> apply</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}
