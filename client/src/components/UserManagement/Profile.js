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
  const [fields, setFields] = useState({ name: "asd", email: "", phoneNumber: "", dob: "", gender: ""});
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
      <AppBar
        position="fixed" elevation={0}
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor:'white', color:'black' }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Password
          </Typography>
        </Toolbar>
        <Divider></Divider> 
      </AppBar>
      
      <SiderBar></SiderBar>
      
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <IconButton>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100}}><PermIdentityIcon sx={{width: 50, height: 50}} /></Avatar>
              </IconButton>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      onChange={handleInputChange}
                      value={fields.name}
                      InputProps={{readOnly: true}}
                    />
                    {errors.name_err_msg && <FormHelperText error>{errors.name_err_msg}</FormHelperText>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleInputChange}
                      value={fields.email}
                      InputProps={{readOnly: true}}
                    />
                    {errors.email_err_msg && <FormHelperText error>{errors.email_err_msg}</FormHelperText>}
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
                    {errors.phoneNumber_err_msg && <FormHelperText error>{errors.phoneNumber_err_msg}</FormHelperText>}
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
                    {errors.dob_err_msg && <FormHelperText error>{errors.dob_err_msg}</FormHelperText>}
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
                    {errors.gender_err_msg && <FormHelperText error>{errors.gender_err_msg}</FormHelperText>}
                  </Grid>
                  <Grid item xs={12}>
                    {alertForChange && <Alert severity="warning">You didn't make any change</Alert>}
                    {alertForPwdDanger.show && <Alert severity="error">{alertForPwdDanger.content}</Alert>}
                    {alertForPwdSuccess && <Alert severity="success">Profile is updated successfully!</Alert>}
                  </Grid>

                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  id='buttom'
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleClickOpen}
                >
                  Edit
                </Button>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Password confirmation</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To change your profile, please enter your password here.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="My password"
                      type="password"
                      fullWidth
                      variant="standard"
                      onChange={handlePasswordConfirm}
                    />
                    {pwdHelper && <FormHelperText error>Please enter your password</FormHelperText>}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleClose}>Confirm</Button>
                  </DialogActions>
                </Dialog>

              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        
      </Box>
    </Box>
    );
}