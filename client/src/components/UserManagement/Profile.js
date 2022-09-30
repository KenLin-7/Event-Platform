import SiderBar from '../UserManagement/SiderBar'
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import React, { useState, useEffect } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Container, Grid, Avatar, Box, Typography, TextField, Button, ThemeProvider, createTheme } from '@mui/material'
import {getUser, profile, updateUser } from '../../api/UserAPI';
import {useUser} from '../../context/UserContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import formValidate from '../../utils/validation'

export default function Profile(){
  const [open, setOpen] = useState(false);
  const [init, setInit] = useState({ nickname: "", email: "", phone: "", dob: "", gender: ""});
  const [errors, setErrors] = useState({ name_err_msg: "", email_err_msg: "", phone: "", dob_err_msg: "", gender_err_msg: "" })
  const [password, setPassword] = useState("")
  const [alertForChange, setAlertForChange] = useState(false)
  const [alertForPwdDanger, setAlertForpwdDanger] = useState({show:false,content:''})
  const [alertForPwdSuccess, setAlertForpwdSuccess] = useState(false)
  const [pwdHelper, setPwdHelper] = useState(false)
  const [control, setControl] = useState(false)

  const [fields, setFields] = useState({ nickname: "", email: "", phone: "", dob: "", gender: ""});
  const {auth} = useUser();
  const [isValidated,setIsValidated] = useState({nickname:true,phone:true,dob:true,email:true,gender:true,});
  const [emailError,setEmailError] = useState("Please enter your email");
  const [passwordError,setPasswordError] = useState("Please enter your nickname");
  const [phoneError,setPhoneError] = useState("Please enter your phone");
  const [dobError,setDobError] = useState("Please enter your dob");
  const [genderError,setGenderError] = useState("Please enter your gender");

  const handleInputChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
      // profile(auth).then((res) => {
      //   setFields({ name: res.data.nickname, email: res.data.email, phoneNumber: res.data.phone, dob: res.data.dob, gender: res.data.gender})
      //   setInit({ name: res.data.nickname, email: res.data.email, phoneNumber: res.data.phone, dob: res.data.dob, gender: res.data.gender})
      // })
      
  },[]);

  const validation = ()=>{
    const validate = {
      email: fields.email,
      dob: fields.dob,
      phone: fields.phone,
      nickname: fields.nickname,
      gender: fields.gender
    }
    const result = formValidate(validate)

    // setting helper text
    if(fields.email !== "")     setEmailError("Please enter correct email") 
    if(fields.nickname !== "")  setPasswordError("Please enter correct password format")         
    if(fields.dob !== "")       setPasswordError("Please enter correct phone format") 
    if(fields.phone !== "")     setPasswordError("Please enter correct phone format") 
    if(fields.gender !== "")    setPasswordError("Please enter correct phone format") 

    
    setIsValidated(result)  
    return result
}


    return (
      <Box sx={{ display: 'flex' }}>
        <SiderBar></SiderBar>
        <Box sx={{width:1, mt:5, display:'block', height:50,}}>

          <Typography variant="h6" noWrap component="div" sx={{width:1,height:40, ml:5,}}>My Account</Typography>
          {/* <Divider></Divider> */}
          <Box component="main" sx={{display:'flex', flexDirection: 'column', alignItems: 'center',}}>
            <Container component="div" maxWidth="xs">
              <Box sx={{mt:10, display:'flex', alignItems:'flex-end', justifyContent:'space-evenly', flexDirection:'row-reverse', }}>
                <IconButton sx={{ display: 'inline', m:0, p:0 }}>
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100}}><PermIdentityIcon sx={{width: 50, height: 50}} /></Avatar>
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{height:40, display:'inline', m:0, p:0}}>{auth}</Typography>
              </Box>

              <Box name="asd" sx={{pt:5, pb:5, pl:5, pr:1, mt:5, display:'flex',backgroundColor:'#eceff1', borderRadius:10,}}>
                <Grid Grid item xs={12} >
                      <TextField
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleInputChange}
                        value={fields.email}
                        InputProps={{readOnly: false}}
                        sx={{width: 6/8}}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        id='buttom'
                        variant="contained"
                        sx={{width: 1/8, height:3/4,m:1,}}
                        // onClick={handleClickOpen}
                      >
                        Edit
                      </Button>
                      {errors.email_err_msg && <FormHelperText error>{errors.email_err_msg}</FormHelperText>}
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
                        value={fields.name}
                        onChange={handleInputChange}
                        InputProps={{readOnly: false}}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        onChange={handleInputChange}
                        value={fields.phoneNumber}
                        InputProps={{readOnly: true}}
                      />
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
                        value={fields.dob}
                        InputProps={{readOnly: true}}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="gender"
                        label="Gender"
                        name="gender"
                        autoComplete="gender"
                        onChange={handleInputChange}
                        value={fields.gender}
                        InputProps={{readOnly: true}}
                      />
                    </Grid>
                  </Grid>
              </Box>

            </Container>
          </Box>
        </Box>
      </Box>
    );
}