import { Box, Button, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import React, { useState } from 'react'
import {HOST_NAME} from '@/app/other/constants'

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChangeUsername = (event) => {
    const val = event.target.value;
    setUsername(val);

    if(val === '') {
        setUsernameError("Username must not be left blank.");
    }
  }

  const handleChangePassword = (event) =>{
    const val = event.target.value;
    setPassword(val);

    if(val === ''){
        setPasswordError("Password must not be left blank.");
    }
  }


  const handleSubmit = (event) =>{
    event.preventDefault()

    const user = {username, password}

    axios.get(`${HOST_NAME}authorization/login`, user)
        .then((res) =>{
                if(res.status === 200) {
                    setIsError(false);

                    setTimeout(() => { // Delay for showing the message before redirection
                        router.push("/home");
                    }, 500);
                }
                else{
                    throw new Error('Login failed');
                }
            })
            // catches the bad response (error)
            .catch((err) => {
                console.error(err);
                setIsError(true);
                setSnackbarMessage('Incorrect username or password!');
                setSnackbarOpen(true);
            })
            .finally(() => {
                setLoading(false);
            });
  }

  return (
    <div className='items-center flex justify-center'>
        <Head>
            <title>
                Login
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
            height: '350px',
            minHeight: '350px',
            maxHeight: '350px',
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
            <Typography component="h1" variant="h4" sx={{ marginBottom:'30px'}}>Login</Typography>

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
                    helperText={passwordError !== "" ? passwordError : ""}
                    onChange={handleChangePassword}
                    sx={{ mb: 2 }}
                />

                <Button variant='contained' onClick={handleSubmit} sx={{ marginTop:'20px'}}>
                    Login
                </Button>
            <br/>
        </Box>
    </div>
  )
}

export default login