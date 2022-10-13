import SiderBar from '../UserManagement/SiderBar'
import React, { useState } from 'react'
import {useNavigate}  from "react-router-dom";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Container, Grid, Avatar, Box, Typography, TextField, Button, Alert} from '@mui/material'
import { Snackbar, CircularProgress} from '@mui/material'
import {updateUserPassword, sendEmail} from '../../api/UserAPI';
import {useUser} from '../../context/UserContext';
import IconButton from '@mui/material/IconButton';
import formValidate from '../../utils/validation';
import FormStyles from '../../asserts/stylesheet/Form.module.css';

export default function Password(){
  const navigate = useNavigate()
  const {auth, signOut} = useUser();
  const [password,setPassword] = useState("")
  const [code,setCode] = useState("")
  const [passwordError, setPasswordError] = useState("Please enter your passowrd");
  const [codeError, setCodeError] = useState("Please enter validation code");
  const [isValidated,setIsValidated] = useState(true);
  const [isValidatedCode,setIsValidatedCode] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef();
  const [errorMsg,setErrorMsg] = useState("")
  const [codeDisabled, setCodeDisabled] = React.useState(false);

  const onChange = (e) =>{
    setPassword(e.target.value)
    if(!isValidated) validation()
    setCode(e.target.value)
    if(code!==''){setIsValidatedCode(true)}
  }

  const onChangeCode = (e) =>{
    setCode(e.target.value)
    if(code!==''){setIsValidatedCode(true)}
  }

  const validation = ()=>{
    const validate = {
      password: password, 
    }
    const result = formValidate(validate)
    setIsValidated(result.password)
    if(password !== "")  setPasswordError("Please enter correct password")
    return result
  }

  const buttonClick = (e) => {
    e.preventDefault()
    const result = validation()
      if(result.password && code!==""){
        setOpen(true);
        updateUserPassword(password,code).then((data)=>{
           if(data.code === "200"){
            timer.current = window.setTimeout(() => {
              setLoading(true)
            }, 2000);
            setLoading(false)
            clearTimeout(timer.current);
            signOut();
            navigate('/')
          }else{
            // timer.current = window.setTimeout(() => {
            //   setOpen(false);
            // }, 2000);
            setOpen(false);
            setErrorMsg(data.msg)
          }
        })
     }else{
      setIsValidatedCode(false);
     }
  }

  const sendCode = (e) => {
    e.preventDefault()
    sendEmail(auth).then((data)=>{
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
      <Box sx={{ display: 'flex', height:700,}}>
        <SiderBar></SiderBar>
        <Box sx={{width:1, mt:5, display:'block', height:50,}}>
          <Typography variant="h6" noWrap component="div" sx={{width:1,height:40, ml:5,}}>Update your Password</Typography>
          <Box component="main" sx={{display:'flex', flexDirection: 'column', alignItems: 'center',}}>
            <Container component="div" maxWidth="xs">


              <Box sx={{pt:7, pb:7, pl:7, pr:7, mt:5, display:'flex',backgroundColor:'#fbfbfb', borderRadius:5, width:350}}>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                      <TextField
                          required
                          fullWidth
                          id="password"
                          label="New password "
                          type="password"
                          name="password"
                          autoComplete="new password"
                          onChange={onChange}
                      />
                      {
                        !isValidated ? (
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
                          onChange={onChangeCode}
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
                  {errorMsg && <Alert severity={"error"} sx={{marginBottom:"15px",width:"90%", mt:1, ml:2,}}>{errorMsg}</Alert>}
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
      </Box>
    );
}