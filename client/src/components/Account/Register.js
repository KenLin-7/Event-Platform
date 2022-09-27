import React,{useState} from 'react'
import styles from '../../asserts/stylesheet/Register.module.css'
import FormStyles from '../../asserts/stylesheet/Form.module.css'
import formValidate from '../../utils/validation'
import bg from '../../asserts/images/register-bg.png'
import { signUp } from '../../api/UserAPI'
import { Link } from 'react-router-dom'
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
    const [emailError,setEmailError] = useState("Please enter your email")
    const [passwordError,setPasswordError] = useState("Please enter your password")
    const [phoneError,setPhoneError] = useState("Please enter your phone")

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
        if(account.phone !== "")  setPasswordError("Please enter correct phone format") 

        
        setIsValidated(result)  
        return result
    }

    const onClick = ()=>{
        signUp(account)

        const result = validation()
        if(result.email & result.password &result.nickname & result.phone){
        }
    }

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
                            <input className={`${FormStyles.formInput} ${FormStyles.user_ic}`} 
                             placeholder='nickname' name='nickname' onChange={onChange}/>
                            {
                               !isValidated.nickname &&                        
                               <div className={FormStyles['helper-text']}>
                                <span>Please enter a nickname</span>
                               </div>
                            }
   
                        </div>
                        <div className={`${FormStyles.field} ${styles.phone}`}>
                            <input className={`${FormStyles.formInput} ${FormStyles.phone_ic}`} 
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
                            <input className={`${FormStyles.formInput} ${FormStyles.email_ic}`} 
                            placeholder='name@email.com' type="email" name='email' onChange={onChange}/>
                            {
                               !isValidated.email &&                        
                               <div className={FormStyles['helper-text']}>
                               <span>{emailError}</span>
                               </div>
                            }
                        </div>
                        <div className={FormStyles.field}>
                            <input className={`${FormStyles.formInput} ${FormStyles.password_ic}`} 
                            placeholder='password' type="password" name='password' onChange={onChange}/>
                            {
                               !isValidated.password &&                        
                               <div className={FormStyles['helper-text']}>
                               <span>{passwordError}</span>
                               </div>
                            }
                        </div>
                    </div>
   
                    <div className={FormStyles['button-area']}>
                        <button className={FormStyles.formButton} onClick={onClick}>Create an account</button>
                        <span><span>Privacy Policy </span>and <span>Terms of service</span> apply</span>
                    </div>

                </div>

            </div>
        </div>
    </div>
  )
}
