import SiderBar from '../UserManagement/SiderBar'
import React, { useState, useEffect } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Container, Grid, Avatar, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Alert, } from '@mui/material'
import { Snackbar, CircularProgress} from '@mui/material'
import {updateUserAvatar, updateUserEmail, profile, updateUser, sendEmail } from '../../api/UserAPI';
import {useUser} from '../../context/UserContext';
import IconButton from '@mui/material/IconButton';
import formValidate from '../../utils/validation'
import FormStyles from '../../asserts/stylesheet/Form.module.css'

export default function Profile(){

  const [user, setuser] = useState({ nickname: "", email: "", phone: "", dob: "", gender: ""});
  const {auth, getAuth} = useUser();
  const [isValidated,setIsValidated] = useState({nickname:true,phone:true,dob:true,email:true,gender:true});
  const [emailError,setEmailError] = useState("Please enter your email");
  const [nameError,setNameError] = useState("Please enter your nickname");
  const [phoneError,setPhoneError] = useState("Please enter your phone");
  const [dobError,setDobError] = useState("Please enter your dob");
  const [genderError,setGenderError] = useState("Please enter your gender");
  const [disabled, setDisabled] = useState(true);
  const [disabledEmail, setDisabledEmail] = useState(true);
  const [errorMsg,setErrorMsg] = useState("")
  const [errorMsgEmail,setErrorMsgEmail] = useState("")
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState("loading");
  const timer = React.useRef();
  const [codeError, setCodeError] = useState("Please enter validation code");
  const [code,setCode] = useState("")
  const [isValidatedCode,setIsValidatedCode] = useState(true);
  const [codeDisabled, setCodeDisabled] = React.useState(false);
  
  const handleInputChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
    if(!isValidated.email || !isValidated.nickname || !isValidated.phone || !isValidated.dob || !isValidated.gender) validation()
  };

  useEffect( () => { 
    clearTimeout(timer.current);
    const loadUser = async () => {
      await profile(auth).then((res) => {
        setuser({ nickname: res.data.nickname, email: res.data.email, phone: res.data.phone, dob: res.data.dob, gender: res.data.gender})
      })
    }
    loadUser() 
  },[auth]);

  const validation = ()=>{
    const validate = {
      dob: user.dob, 
      phone: user.phone,
      nickname: user.nickname,
      gender: user.gender,
      email: user.email
    }
    const result = formValidate(validate)
    setIsValidated(result)
    // setting helper text
    if(user.nickname !== "")  setNameError("Please enter correct nick name")        
    if(user.dob !== "")       setDobError("Please enter correct birthdate format") 
    if(user.phone !== "")     setPhoneError("Please enter correct phone format") 
    if(user.gender !== "")    setGenderError("Please enter correct gender format") 
    if(user.email !== "")     setEmailError("Please enter correct email format") 
    return result
  }

  const buttonClick = (e) => {
    e.preventDefault()
    let button = document.getElementById('button')
    if(button.innerText === 'EDIT'){
      button.innerText = 'Update';
     setDisabled(false);
    }else{
      const result = validation()
      if(result.nickname && result.phone && result.dob && result.gender){
          setOpen(true);
          updateUser(user).then((data)=>{
            if(data.code === "200") {
              timer.current = window.setTimeout(() => {
                setLoading("success")
              }, 2000);
              timer.current = window.setTimeout(() => {
                setOpen(false);
              }, 2000);
              getAuth();
              setDisabled(true);
              button.innerText = 'EDIT';
              clearTimeout(timer.current);
            }else{
              // timer.current = window.setTimeout(() => {
              //   setLoading("fail")
              // }, 2000);
              timer.current = window.setTimeout(() => {
                setOpen(false);
              }, 2000);
              setErrorMsg(data.msg)
            }
         })
        }else{
          setIsValidated(false)
        }
    }
  }

  const emailButtonClick = (e) => {
    e.preventDefault()
    let emailButton = document.getElementById('emailButton')
    if(emailButton.innerText === 'EDIT'){
      emailButton.innerText = 'Update';
      setDisabledEmail(false);
    }else{
      const result = validation()
      if(result.email && code!==''){
          setOpen(true);
          updateUserEmail(user.email,code).then((data)=>{
            if(data.code === "200") {
              timer.current = window.setTimeout(() => {
                setLoading("success")
              }, 2000);
              timer.current = window.setTimeout(() => {
                setOpen(false);
              }, 2000);
              setDisabledEmail(true);
              emailButton.innerText = 'EDIT';
              clearTimeout(timer.current);
            }else {
              // timer.current = window.setTimeout(() => {
              //   setLoading("fail")
              // }, 2000);
              timer.current = window.setTimeout(() => {
                setOpen(false);
              }, 2000);
              setErrorMsgEmail(data.msg)
            }
         })
     }else{
      setIsValidatedCode(false)
     }
    }
  }

  const sendCode = (e) => {
    e.preventDefault()
    sendEmail(user.email).then((data)=>{
      if(data.code === "200"){
        setCodeDisabled(true)
        setIsValidatedCode(false)
        setCodeError("Please check your email")
        disableWait()
      }else{
        setErrorMsg(data.msg)
      }
   })
  }

  const handleClose = (event) => {
    setOpen(false);
  };

  function disableWait(){
    const sendCodeButton = document.getElementById('codeButton')
    var t = 5
    var i = setInterval(function(){  
      if(t > 0) {  
        sendCodeButton.innerText = t--+" s";
      }else{
        clearInterval(i);
        sendCodeButton.innerText = 'Send';
        setCodeDisabled(false);
      }  
    }, 1000);
  };

    return (
      <Box sx={{ display: 'flex' }}>
        <SiderBar></SiderBar>
        <Box sx={{width:1, mt:5, display:'block', height:50,}}>

          <Typography variant="h6" noWrap component="div" sx={{width:1,height:40, ml:5,}}>My Account</Typography>
          <Box component="main" sx={{display:'flex', flexDirection: 'column', alignItems: 'center',}}>
            <Container component="div" maxWidth="xs">
              <Box sx={{mt:10, display:'flex', alignItems:'flex-end', justifyContent:'space-evenly', flexDirection:'row-reverse', }}>
                <IconButton sx={{ display: 'inline', m:0, p:0 }}>
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100}}><PermIdentityIcon sx={{width: 50, height: 50}} /></Avatar>
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{height:40, display:'inline', m:0, p:0}}>{auth}</Typography>
              </Box>

              <Box sx={{pt:5, pb:3, pl:5, mt:5, display:'flex',backgroundColor:'#eceff1', borderRadius:10,}}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleInputChange}
                        value={user.email}
                        disabled={disabledEmail}
                        sx={{width: 14/20}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        id='emailButton'
                        variant="contained"
                        onClick={emailButtonClick}
                        sx={{width: 1/8, mt:1,ml:1,}}
                    >
                        Edit
                    </Button>
                    {
                        !isValidated.email ? (
                          <div className={FormStyles['helper-text']}>
                          <span>{emailError}</span>
                        </div>
                        ):(
                            <></>
                        )
                      }
                </Grid>
                {!disabledEmail?(<Grid item xs={12} >
                      <TextField
                          required
                          fullWidth
                          id="code"
                          label="Validation code "
                          name="code"
                          autoComplete="code"
                          onChange={event => setCode(event.target.value)}
                          sx={{width: 14/20}}
                      />
                      <Button
                          type="submit"
                          fullWidth
                          id='codeButton'
                          variant="contained"
                          onClick={sendCode}
                          sx={{width:1/8, mt:1,ml:1,}}
                          disabled={codeDisabled}
                      >
                          Send
                      </Button>
                      {
                        !isValidatedCode ? (
                          <div id='code' className={FormStyles['helper-text']}>
                            <span id='span'>{codeError}</span>
                          </div>
                        ):(
                            <></>
                        )
                      }
                  </Grid>)
                  :(
                    <></>
                  )
                  }
                  {errorMsgEmail && <Alert severity={"error"} sx={{marginBottom:"15px",width:"90%", mt:2,mr:4,ml:2,}}>{errorMsgEmail}</Alert>}
              </Grid>
              
              </Box>  

              <Box component="form" noValidate sx={{backgroundColor:'#eceff1', pt:5, pb:5, pl:5, pr:5, mb:5, mt:3, borderRadius:10,}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="nickname"
                        name="nickname"
                        required
                        fullWidth
                        id="nickname"
                        label="Nickname"
                        value={user.nickname || ''}
                        onChange={handleInputChange}
                        disabled={disabled}
                      />
                      {
                        !isValidated.nickname ? (
                          <div className={FormStyles['helper-text']}>
                          <span>{nameError}</span>
                        </div>
                        ):(
                            <></>
                        )
                      }
                    </Grid>
                    <Grid item xs={12}> 
                      <TextField
                        required
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="phone"
                        onChange={handleInputChange}
                        value={user.phone || ''}
                        //InputProps={{readOnly: true}}
                        disabled={disabled}
                      />
                      {
                        !isValidated.phone ? (
                          <div className={FormStyles['helper-text']}>
                          <span>{phoneError}</span>
                        </div>
                        ):(
                            <></>
                        )
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="dob"
                        label="Birthdate"
                        name="dob"
                        autoComplete="dob"
                        onChange={handleInputChange}
                        value={user.dob || ''}
                        //InputProps={{readOnly: true}}
                        disabled={disabled}
                      />
                      {
                        !isValidated.dob ? (
                          <div className={FormStyles['helper-text']}>
                          <span>{dobError}</span>
                        </div>
                        ):(
                            <></>
                        )
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="gender" color='info'>Gender</InputLabel>
                        <Select
                          id="gender"
                          value={user.gender || ''}
                          label="Gender"
                          name="gender"
                          onChange={handleInputChange}
                          labelId="gender"
                          disabled={disabled}
                        >
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                          <MenuItem value={'Other'}>Other</MenuItem>
                          <MenuItem value={'Maintain Secrecy'}>Maintain Secrecy</MenuItem>
                        </Select>
                      </FormControl>
                      {
                        !isValidated.gender ? (
                          <div className={FormStyles['helper-text']}>
                          <span>{genderError}</span>
                        </div>
                        ):(
                            <></>
                        )
                      }
                    </Grid>
                  </Grid>
                  {errorMsg && <Alert severity={"error"} sx={{marginBottom:"15px",width:"90%", mt:1,}}>{errorMsg}</Alert>}
                  <Button
                    type="submit"
                    fullWidth
                    id='button'
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={buttonClick}
                  >
                    Edit
                  </Button>
              </Box>
              <Snackbar open={open} autoHideDuration={4000}>

                {/* {loading === "fail" &&
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%', '.MuiAlert-message':{width:150,}}}>Update success<CircularProgress size={20} sx={{ml:2,}}/></Alert>
                } */}

                {loading === "loading" ?
                (<Alert severity="info" sx={{ width: '100%', '.MuiAlert-message':{width:100,} }}>Updating<CircularProgress size={20} sx={{ml:2,}}/></Alert>)
                :
                (<Alert onClose={handleClose} severity="success" sx={{ width: '100%', '.MuiAlert-message':{width:150,}}}>Update success<CircularProgress size={20} sx={{ml:2,}}/></Alert>)
                }
              </Snackbar>
            </Container>
          </Box>
        </Box>
      </Box>
    );
}