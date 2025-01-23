import { useAuth } from '@/context/AuthContext';
import { Box, Button, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Link from 'next/link';
import InputAdornment from '@mui/material/InputAdornment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  
    const { login, student } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      // console.log("STUDENT: " + student);
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
      setLoading(true);
  
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
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-purple-50'>

      <Box 
        component="form" 
        validate="true" 
        sx={{
          width: '100%',
          maxWidth: '450px',
          margin: 'auto',
          padding: '3rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(107, 33, 168, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          border: '1px solid rgba(107, 33, 168, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 25px 60px rgba(107, 33, 168, 0.15)',
          }
        }}
      >
        <Typography 
          component="h1" 
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900"
          sx={{ 
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}
        >
          Welcome back.
        </Typography>

        <TextField
          label="Username"
          id="username"
          name="username"
          fullWidth
          error={usernameError !== ""}
          helperText={usernameError !== "" ? usernameError : ""}
          onChange={handleChangeUsername}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(107, 33, 168, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(107, 33, 168, 0.3)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(107, 33, 168, 0.5)',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'rgba(107, 33, 168, 0.8)',
            },
          }}
        />

        <div className="w-full">
          <TextField
            type={showPassword ? "text" : "password"}
            label="Password"
            id="password"
            name="password"
            fullWidth
            error={passwordError !== ""}
            helperText={passwordError !== "" ? passwordError : ""}
            onChange={handleChangePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button 
                    onClick={() => setShowPassword(!showPassword)} 
                    size="small" // Makes the button smaller
                    sx={{ 
                      textTransform: 'none',
                      color: '#6B21A8',
                      minWidth: '30px', // Adjust the width
                      padding: '4px', // Adjust padding for a smaller size
                    }}
                  >
                    {showPassword ? <RemoveRedEyeIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                  </Button>
                </InputAdornment>
              ),
            }}
            
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(107, 33, 168, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(107, 33, 168, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(107, 33, 168, 0.5)',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'rgba(107, 33, 168, 0.8)',
              },
            }}
          />
          <Link 
            href="/password-reset-request" 
            className="block text-right mt-2 text-sm text-purple-600 hover:text-purple-800 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button 
          variant='contained' 
          onClick={handleSubmit}
          disabled={loading}
          sx={{ 
            mt: 2,
            width: '100%',
            py: 1.5,
            bgcolor: '#6B21A8',
            borderRadius: '9999px',
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: 500,
            boxShadow: '0 4px 14px 0 rgba(107, 33, 168, 0.39)',
            '&:hover': {
              bgcolor: '#581c87',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px 0 rgba(107, 33, 168, 0.39)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <Typography variant="body2" sx={{ color: 'rgba(107, 33, 168, 0.6)', mt: 2 }}>
          {"Don't have an account? "}
          <Link href="/register" className="text-purple-700 hover:text-purple-900 font-medium">
            Register now
          </Link>
        </Typography>
      </Box>
    </div>
  )
}

export default Login