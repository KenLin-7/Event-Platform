import SiderBar from '../UserManagement/SiderBar'
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import React, { useState, useEffect } from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Container, Grid, CssBaseline, Avatar, Box, Typography, TextField, Button, ThemeProvider, createTheme } from '@mui/material'
import { getUser, updateUser } from '../../api/UserAPI';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

export default function Profile(){
  const drawerWidth = 240;
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", phoneNumber: "", dob: "", gender: ""});
  const [init, setInit] = useState({ name: "", email: "", phoneNumber: "", dob: "", gender: ""});
  const [errors, setErrors] = useState({ name_err_msg: "", email_err_msg: "", phoneNumber_err_msg: "", dob_err_msg: "", gender_err_msg: "" })
  const [password, setPassword] = useState("")
  const [alertForChange, setAlertForChange] = useState(false)
  const [alertForPwdDanger, setAlertForpwdDanger] = useState({show:false,content:''})
  const [alertForPwdSuccess, setAlertForpwdSuccess] = useState(false)
  const [pwdHelper, setPwdHelper] = useState(false)
  const [control, setControl] = useState(false)


  const handleInputChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const theme = createTheme();

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser()
      setFields({ name: user.name, email: user.email, phoneNumber: user.phoneNumber, dob: user.dob, gender: user.gender})
      setInit({ name: user.name, email: user.email, phoneNumber: user.phoneNumber, dob: user.dob, gender: user.gender})
    }
    loadUser()
  }, [control]);

  // open and close dialog
  const handleClickOpen = (e) => {
    e.preventDefault()
    let buttom = document.getElementById('buttom')
    if(buttom.innerText === 'EDIT'){
      buttom.innerText = 'Update';
      document.getElementById('name').readOnly = false;
      document.getElementById('email').readOnly = false;
      document.getElementById('phoneNumber').readOnly = false;
      document.getElementById('dob').readOnly = false;
      document.getElementById('gender').readOnly = false;
    }else{
      setPwdHelper(false)
        // check user updated or not 
      if(fields.name === init.name && fields.email === init.email && fields.phoneNumber === init.phoneNumber && fields.dob === init.dob && fields.gender === init.gender){
        setAlertForChange(true)
        setTimeout(() => setAlertForChange(false), 2000)
      }else{
        if(fields.name===""){setErrors.name_err_msg="Name cannot be empty"}
        if(fields.email===""){setErrors.email_err_msg="Email cannot be empty"}
        if(fields.phoneNumber===""){setErrors.phoneNumber_err_msg="phoneNumber cannot be empty"}
        if(fields.dob===""){setErrors.dob_err_msg="Birthdate cannot be empty"}
        if(fields.gender===""){setErrors.gender_err_msg="Gender cannot be empty"}
        if (errors.email_err_msg === "" && errors.name_err_msg === "" && errors.dob_err_msg === "" && errors.gender_err_msg === "" && errors.phoneNumber_err_msg === "") {
          setOpen(true)
        }
      }
    }
  };

  const handleClose = async () => {
    if(password === ""){
      setPwdHelper(true)
      return
    }
    // check user update or not 
    if(fields.name === init.name && fields.email === init.email && fields.phoneNumber === init.phoneNumber && fields.dob === init.dob && fields.gender === init.gender){
      setAlertForChange(true)
      setTimeout(() => setAlertForChange(false), 2000)
    } else {
        const result = await updateUser(fields.name, fields.email, fields.phoneNumber, fields.dob, fields.gender)
        if (result.data) {
          setAlertForpwdSuccess(true)
          setTimeout(() => setAlertForpwdSuccess(false), 2000)
          setControl(!control)
          document.getElementById('buttom').innerText = 'Edit';
          document.getElementById('name').readOnly = true;
          document.getElementById('email').readOnly = true;
          document.getElementById('phoneNumber').readOnly = true;
          document.getElementById('dob').readOnly = true;
          document.getElementById('gender').readOnly = true;
          setFields({ firstName: init.firstName, lastName: init.lastName, email: init.email })
        } else {
          setAlertForpwdDanger({
            show: true,
            content: result.msg
          })
          setTimeout(() => setAlertForpwdDanger(false), 2000)
          setFields({ firstName: init.firstName, lastName: init.lastName, email: init.email })       
        }
    }
    setOpen(false);
  };

  const handleCloseDialog = () =>{
    setOpen(false);
    setPassword("")
  }

  const handlePasswordConfirm = (e) => {
    setPassword(e.target.value)
  }

    return (
      <Box sx={{ display: 'flex' }}>
        <SiderBar></SiderBar>
        <Box sx={{width:1, mt:3,}}>
          <Typography variant="h6" noWrap component="div" sx={{width:1,height:40,}}>
                My Account
          </Typography>
          <Divider></Divider>
        </Box>

        <Box sx={{display:'block', backgroundColor: '#757ce8',width:50, height:50}}>

        </Box>
      </Box>
    );
}