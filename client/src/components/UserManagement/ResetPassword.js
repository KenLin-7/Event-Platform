import React, { useState } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Container, Grid, Avatar, Box, Typography, TextField, Button, Alert} from '@mui/material'
import { Snackbar, CircularProgress} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import formValidate from '../../utils/validation';
import FormStyles from '../../asserts/stylesheet/Form.module.css';
import {resetPassword} from '../../api/UserAPI';
import {useNavigate}  from "react-router-dom";

export default function ResetPassword(){
    const [password,setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("Please enter your passowrd");
    const [isValidated,setIsValidated] = useState({email:true,password:true})
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef();
    const [errorMsg,setErrorMsg] = useState("")
    const navigate = useNavigate()
    const validation = ()=>{
      const validate = {
        password: password, 
      }
      const result = formValidate(validate)
      setIsValidated(result)
      if(password !== "")  setPasswordError("Please enter correct password")
      return result
    }
  
    const buttonClick = (e) => {
      e.preventDefault()
      const result = validation()
        if(result.password){
          setOpen(true);
          resetPassword(password).then((data)=>{
             if(data.code === "200"){
              timer.current = window.setTimeout(() => {
                setLoading(true)
              }, 2000);
              clearTimeout(timer.current);
              setLoading(false);
              navigate('/login')
            }else{
              timer.current = window.setTimeout(() => {
                setOpen(false);
              }, 2000);
              setErrorMsg(data.msg)
            }
          })
       }
    }
  
    const handleClose = (event) => {
      setOpen(false);
    };
    
      return (
          <Box sx={{width:1, mt:5, display:'block', height:50,}}>
          <Typography variant="h6" noWrap component="div" sx={{width:1,height:40, ml:5,}}>Please enter you new password</Typography>
          <Box component="main" sx={{display:'flex', flexDirection: 'column', alignItems: 'center',}}>
            <Container component="div" maxWidth="xs">

  
              <Box sx={{pt:5, pb:5, pl:5, pr:5, mt:5, display:'flex',backgroundColor:'#fbfbfb', borderRadius:5,}}>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                      <TextField
                          required
                          fullWidth
                          id="password"
                          label="New password "
                          name="password"
                          autoComplete="password"
                          type="password"
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
      );
}