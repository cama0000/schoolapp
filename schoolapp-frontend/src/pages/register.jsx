import { useAuth } from '@/context/AuthContext';
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const [nameError, setNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    
    const { student, setStudentFromToken } = useAuth();
    const router = useRouter();
  
    useEffect(() =>{
      if(student){
          router.push("/home");
      }
    })
  
    const handleChangeFirstName = (event) => {
      const val = event.target.value;
  
      setFirstName(val);
  
      if(val == ''){
          setNameError("First name must not be left blank.");
      }
      else{
          setNameError("");
      }
    }
  
    const handleChangeLastName = (event) => {
      const val = event.target.value;
  
      setLastName(val);
  
      if(val == ''){
          setLastNameError("Last name must not be left blank.");
      }
      else{
          setLastNameError("");
      }
    }
  
    const handleChangeUsername = (event) => {
      const val = event.target.value;
      setUsername(val);
  
      if(val === '') {
          setUsernameError("Username must not be left blank.");
      }
      else{
          axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}authorization/check-username/${val}`)
              .then(() => {
                  setUsernameError("");
              })
              .catch((res) => {
                  setUsernameError("Username is already taken.");
              })
      }
    }
  
    const handleChangeEmail = (event) => {
      const val = event.target.value;
      setEmail(val);
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if(val === ''){
          setEmailError("Email must not be left blank.");
      }
      else if(!emailRegex.test(val)){
          setEmailError("Invalid email.")
      }
      else{
          axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}authorization/check-email/${val}`)
              .then(() => {
                  setEmailError("");
              })
              .catch((res) => {
                  setEmailError("Email is already taken.");
              });
      }
    };
  
    const handleChangePassword = (event) =>{
      const val = event.target.value;
      setPassword(val);
  
      if(val === ''){
          setIsPasswordEntered(false);
      }
      else{
          setIsPasswordEntered(true);
      }
  
      // recheck passwords when going back to change original password
      if(confirmPassword !== ""){
          if(confirmPassword !== val){
              setConfirmPasswordError("Passwords do not match.");
          }
          else{
              setConfirmPasswordError("");
          }
      }
    }
  
    const handleChangeConfirmPassword = (event) => {
      const val = event.target.value;
      setConfirmPassword(val);
  
      if(val !== password){
          setConfirmPasswordError("Passwords do not match.");
      }
      else{
          setConfirmPasswordError("");
      }
  };
  
      const handleSubmit = (event) =>{
          event.preventDefault()
          // validate all fields
  
          if(firstName === '' || lastName === '' || email === '' || username === '' || password === '' || confirmPassword === ''){
              alert("Please fill out all blank fields.");
              return;
          }
  
          if(nameError !== "") {
              alert(nameError);
              return;
          }
  
          if(lastNameError !== "") {
              alert(lastNameError);
              return;
          }
  
          if(emailError !== "") {
              alert(emailError);
              return;
          }
  
          if(usernameError !== "") {
              alert(usernameError);
              return;
          }
  
          if(passwordError !== "") {
              alert(passwordError);
              return;
          }
  
          if(confirmPasswordError !== "") {
              alert(confirmPasswordError);
              return;
          }
  
          // type: registerRequest
          const user = { firstName, lastName, email, username, password }
  
          axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}authorization/register`, user)
              .then((res) =>{
                  toast.success("Registration successful!");
  
                  const token = res.data.token;
                  localStorage.setItem('access_token', token)
                  setStudentFromToken();
  
                  router.push("/home");
              })
              .catch((res) =>{
                  toast.error("Registration unsuccessful.");
                  console.log(res)
              })
  
      }

  return (
    <div className='items-center flex justify-center'>
        <Head>
            <title>
                Register
            </title>
        </Head>

        <Box component="form" validate="true" sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            minWidth: '500px',
            maxWidth: '500px',
            height: '500px',
            minHeight: '500px',
            maxHeight: '500px',
            overflowY: 'auto',
            padding: 4,
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            border: '3px solid #AA61E2',
            borderStyle: 'border-radius: 20px',
            transition: 'border 1s ease-in-out, border-image 1s ease-in-out',
        }}>
            <Typography component="h1" variant="h4" sx={{ marginBottom:'30px'}}>Register</Typography>

                <TextField
                    label="First Name"
                    autoComplete="given-name"
                    id="firstName"
                    name="firstName"
                    fullWidth
                    error={nameError !== ""}
                    helperText={nameError !== "" ? nameError : ""}
                    onChange={handleChangeFirstName}
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Last Name"
                    autoComplete="last-name"
                    id="lastName"
                    name="lastName"
                    fullWidth
                    error={lastNameError !== ""}
                    helperText={lastNameError !== "" ? lastNameError : ""}
                    onChange={handleChangeLastName}
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Email"
                    autoComplete="email"
                    id="email"
                    name="email"
                    fullWidth
                    error={emailError !== ""}
                    helperText={emailError !== "" ? emailError : ""}
                    onChange={handleChangeEmail}
                    sx={{ mb: 1 }}
                />

                <TextField
                    label="Username"
                    id="username"
                    name="username"
                    fullWidth
                    error={usernameError !== ""}
                    helperText={usernameError !== "" ? usernameError : ""}
                    onChange={handleChangeUsername}
                    sx={{ mb: 2 }}
                />

                <TextField
                    type= "password" 
                    label="Password"
                    id="password"
                    name="password"
                    fullWidth
                    error={passwordError !== ""}
                    onChange={handleChangePassword}
                    sx={{ mb: 2 }}
                />

                <TextField
                    type="password"
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    fullWidth
                    error={confirmPasswordError !== ""}
                    helperText={confirmPasswordError !== "" ? confirmPasswordError : ""}
                    onChange={handleChangeConfirmPassword}
                    sx={{ mb: 2 }}
                />

                <Button variant='contained' onClick={handleSubmit} sx={{ marginTop:'20px'}}>
                    Register
                </Button>
            <br/>
        </Box>
    </div>
  )
}

export default Register