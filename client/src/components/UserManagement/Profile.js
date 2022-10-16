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
import {useNavigate}  from "react-router-dom";
import defaultAvatar from '../../asserts/images/default-avatar.jpg'
import {ref,uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import storage from '../../firebase/storage'
export default function Profile(){
  const navigate = useNavigate()
  const [user, setuser] = useState({nickname: "", email: "", phone: "", dob: "", gender: "",avatar:""});
  const {auth, getAuth, signOut} = useUser();
  const [avatar,setAvatar] = useState("");
  const [isValidated,setIsValidated] = useState({nickname:true,phone:true,dob:true});
  const [isValidatedEmail,setIsValidatedEmail] = useState({email:true,});
  const [emailError,setEmailError] = useState("Please enter your new email");
  const [nameError,setNameError] = useState("Please enter your nickname");
  const [phoneError,setPhoneError] = useState("Please enter your phone");
  const [dobError,setDobError] = useState("Please enter your dob");
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
    setuser({...user, [e.target.name]: e.target.value });
    if(!isValidated.nickname || !isValidated.phone || !isValidated.dob || !isValidated.gender) validation()
    if(!isValidatedEmail.email) validationemail()
  };
  const onChangeCode = (e) => {
    setCode(e.target.value)
    if(code!==''){setIsValidatedCode(true)}
  };
  useEffect( () => { 
    clearTimeout(timer.current);
    const loadUser = async () => {
      if(auth){
        await profile(auth).then((res) => {
          setuser({ nickname: res.data.nickname, email: res.data.email, phone: res.data.phone, dob: res.data.dob, gender: res.data.gender,avatar:res.data.avatar})
        })
      }

    }
    loadUser() 
  },[auth]);

  const validation = ()=>{
    const validate = {
      dob: user.dob, 
      phone: user.phone,
      nickname: user.nickname,
    }
    const result = formValidate(validate)
    setIsValidated(result)
    // setting helper text
    if(user.nickname !== "")  setNameError("Please enter correct nick name")        
    if(user.dob !== "")       setDobError("Please enter correct birthdate format") 
    if(user.phone !== "")     setPhoneError("Please enter correct phone format") 
    return result 
  }

  const validationemail = ()=>{
    const validate = {email: user.email}
    const result = formValidate(validate)
    setIsValidatedEmail(result)
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
      if(result.nickname && result.phone && result.dob){
        setOpen(true)
        timer.current = window.setTimeout(() => {
          setLoading("loadings")
        }, 2000);
        const imageRef = ref(storage,`avatar/${avatar.name+new Date().getTime()}`)

        const uploadTask = uploadBytesResumable(imageRef,avatar)
        // upload process
        uploadTask.on("state_changed",(snapshot)=>{

        },(err)=>{
    
        },()=>{
            // Upload completed successfully, return download url 
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                updateUser(user,downloadURL).then((data)=>{
                  if(data.code === "200") {
                    setLoading("success")
                    getAuth();
                    setDisabled(true);
                    button.innerText = 'EDIT';
                    clearTimeout(timer.current);
                  }else{
                    setOpen(false);
                    setErrorMsg(data.msg)
                  }
                })
            })
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
      const result = validationemail()
      if(result.email && code!==''){
          setOpen(true);
          updateUserEmail(user.email,code).then((data)=>{
            if(data.code === "200") {
              timer.current = window.setTimeout(() => {
                setLoading("loadings")
              }, 2000);
              setLoading("success")
              setDisabledEmail(true);
              emailButton.innerText = 'EDIT';
              clearTimeout(timer.current);
              signOut();
              navigate('/')
            }else {
              setOpen(false);
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

  const avatarOnChange = (e)=>{
    setAvatar(e.target.files[0])
  }

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
      <Box sx={{ display: 'flex',}}>
        <SiderBar></SiderBar>
        <Box sx={{width:1, mt:5, display:'block', height:60,}}>

          <Typography variant="h6" noWrap component="div" sx={{width:1,height:40, ml:5,}}>My Account</Typography>
          <Box component="main" sx={{display:'flex', flexDirection: 'column', alignItems: 'center',}}>
            <Container component="div" maxWidth="xs">
              <Box sx={{mt:10, display:'flex', alignItems:'center', justifyContent:'flex-start' }}>
                <IconButton sx={{ display: 'inline', m:0, p:0 }} aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" onChange={avatarOnChange} />
                  <Avatar sx={{ m: 1, width: 80, height: 80}} src={user.avatar !== null && avatar === ""? user.avatar:avatar&&URL.createObjectURL(avatar)} />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{height:40, display:'inline', m:0, p:0}}>{auth}</Typography>
              </Box>
              <Box component="form" noValidate sx={{backgroundColor:'#fbfbfb', pt:7, pb:7, pl:7, pr:7, mb:5, mt:3, borderRadius:5, width:350,}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="nickname"
                        name="nickname"
                        placeholder='Jack'
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
                        placeholder='0xxxxxxxx'
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
                        placeholder='yyyy-mm-dd'
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
                    </Grid>
                  </Grid>
                  {errorMsg && <Alert severity={"error"} sx={{marginBottom:"15px",width:"90%", mt:1, ml:2,}}>{errorMsg}</Alert>}
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

              {/* <Box component="form" noValidate sx={{backgroundColor:'#fbfbfb', pt:7, pb:7, pl:7, pr:7, mb:5, mt:3, borderRadius:5, width:350,}}>
              <Grid container spacing={2} sx={{width:1,}}>
                <Grid item xs={12} >
                    <TextField
                        required
                        placeholder='Plase enter your new email'
                        fullWidth
                        id="emailfield"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleInputChange}
                        value={user.email}
                        disabled={disabledEmail}
                        sx={{width: 15/20}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        id='emailButton'
                        variant="contained"
                        onClick={emailButtonClick}
                        sx={{width: 1/8, mt:1,ml:2.4,mr:0,}}
                    >
                        Edit
                    </Button>
                    {
                        !isValidatedEmail.email ? (
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
                          placeholder='Plase enter validation code'
                          id="code"
                          label="Validation code "
                          name="code"
                          autoComplete="code"
                          onChange={onChangeCode}
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
              </Box>  */}

              <Snackbar open={open} autoHideDuration={4000}>
                {loading === "loading" ?
                (<Alert severity="info" sx={{ width: '100%', '.MuiAlert-message':{width:100,} }}>Updating<CircularProgress size={20} sx={{ml:2,}}/></Alert>)
                :
                (<Alert onClose={handleClose} severity="success" sx={{ width: '100%', '.MuiAlert-message':{width:150,}}}>Update success</Alert>)
                }
              </Snackbar>
            </Container>
          </Box>
        </Box>
      </Box>
    );
}