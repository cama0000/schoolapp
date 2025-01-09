import { useAuth } from '@/context/AuthContext';
import { Box, Button, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {  // Changed from 'login' to 'Login'
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    const { login, student } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      console.log("STUDENT: " + student);
      if (student) {
        router.push("/home");
      }
    }, [student, router]);
  
    const handleChangeUsername = (event) => {
      const val = event.target.value;
      setUsername(val);
      setUsernameError(val === '' ? "Username must not be left blank." : "");
    };
  
    const handleChangePassword = (event) => {
      const val = event.target.value;
      setPassword(val);
      setPasswordError(val === '' ? "Password must not be left blank." : "");
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const usernamePassword = { username, password };
      setLoading(true); // Added for loading state management
  
      login(usernamePassword)
        .then(() => {
          setIsError(false);
          setTimeout(() => {
            toast.success("Login successful!");
            router.push("/home");
          }, 500);
        })
        .catch((err) => {
          console.error("Login Error:", err);
          setIsError(true);
          toast.error("Invalid username and/or password.");
        })
        .finally(() => {
          setLoading(false);
        });
    };

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

export default Login