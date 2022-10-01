import React, { useState } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Container, Grid, Avatar, Box, Typography, TextField, Button, Alert} from '@mui/material'
import { Snackbar, CircularProgress} from '@mui/material'
import {forgotPassword, sendEmail} from '../../api/UserAPI';
import IconButton from '@mui/material/IconButton';
import formValidate from '../../utils/validation';
import FormStyles from '../../asserts/stylesheet/Form.module.css';

export default function Password(){
  const [password,setPassword] = useState("")
  const [code,setCode] = useState("")
  const [email,setEmail] = useState("")
  const [passwordError, setPasswordError] = useState("Please enter your passowrd");
  const [emailError, setEmailError] = useState("Please enter your email");
  const [codeError, setCodeError] = useState("Please enter validation code");
  const [isValidated,setIsValidated] = useState({email:true,password:true})
  const [isValidatedCode,setIsValidatedCode] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef();
  const [errorMsg,setErrorMsg] = useState("")
  const [codeDisabled, setCodeDisabled] = React.useState(false);

  const validation = ()=>{
    const validate = {
      password: password, 
      email: email,
    }
    const result = formValidate(validate)
    setIsValidated(result)
    if(password !== "")  setPasswordError("Please enter correct password")
    if(password !== "")  setEmailError("Please enter correct email format")
    return result
  }

  const buttonClick = (e) => {
    e.preventDefault()
    const result = validation()
      if(result.password && code!=="" && result.email){
        setOpen(true);
        forgotPassword(email,password,code).then((data)=>{
           if(data.code === "200"){
            timer.current = window.setTimeout(() => {
              setLoading(true)
            }, 2000);
            timer.current = window.setTimeout(() => {
              setOpen(false);
            }, 2000);Password("");
            clearTimeout(timer.current);
          }else{
            // timer.current = window.setTimeout(() => {
            //   setLoading(true)
            // }, 2000);
            timer.current = window.setTimeout(() => {
              setOpen(false);
            }, 2000);
            setErrorMsg(data.msg)
          }
        })
     }else{
      setIsValidatedCode(false);
     }
  }

  const sendCode = (e) => {
    e.preventDefault()
    sendEmail(email).then((data)=>{
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
        <Box sx={{width:1, mt:5, display:'block', height:50,}}>
        <Typography variant="h6" noWrap component="div" sx={{width:1,height:40, ml:5,}}>Password</Typography>
        <Box component="main" sx={{display:'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Container component="div" maxWidth="xs">

            <Box sx={{mt:10, display:'flex', alignItems:'flex-end', justifyContent:'space-evenly', flexDirection:'row-reverse', }}>
              <IconButton sx={{ display: 'inline', m:0, p:0 }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100}}><PermIdentityIcon sx={{width: 50, height: 50}} /></Avatar>
              </IconButton>
            </Box>

            <Box sx={{pt:5, pb:5, pl:5, pr:5, mt:5, display:'flex',backgroundColor:'#eceff1', borderRadius:10,}}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email address "
                            name="email"
                            autoComplete="email"
                            onChange={event => setEmail(event.target.value)}
                        />
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
                <Grid item xs={12} >
                    <TextField
                        required
                        fullWidth
                        id="password"
                        label="Password "
                        name="password"
                        autoComplete="password"
                        onChange={event => setPassword(event.target.value)}
                    />
                    {
                      !isValidated.password ? (
                        <div className={FormStyles['helper-text']}>
                        <span>{passwordError}</span>
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
                        id="code"
                        label="Validation code "
                        name="code"
                        autoComplete="code"
                        onChange={event => setCode(event.target.value)}
                        sx={{width: 11/20}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        id='codeButton'
                        variant="contained"
                        onClick={sendCode}
                        sx={{width:8/20, mt:1,ml:1,}}
                        disabled={codeDisabled}
                    >
                        Send code
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
                </Grid>
                {errorMsg && <Alert severity={"error"} sx={{marginBottom:"15px",width:"90%", mt:1,}}>{errorMsg}</Alert>}
                <Grid item xs={12} >
                  
                  <Button
                      type="submit"
                      fullWidth
                      id='button'
                      variant="contained"
                      onClick={buttonClick}
                      sx={{mt:1,}}
                  >
                      Update
                  </Button>
                </Grid>
                
              </Grid>
            </Box>  
            <Snackbar open={open} autoHideDuration={4000}>
              {!loading ?
              (<Alert severity="info" sx={{ width: '100%', '.MuiAlert-message':{width:100,} }}>Updating<CircularProgress size={20} sx={{ml:2,}}/></Alert>)
              :
              (<Alert onClose={handleClose} severity="success" sx={{ width: '100%', '.MuiAlert-message':{width:150,}}}>Update success<CircularProgress size={20} sx={{ml:2,}}/></Alert>)
              }
            </Snackbar>
          </Container>
        </Box>
      </Box>
    );
}