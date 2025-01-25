import { useAuth } from '@/context/AuthContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputAdornment from '@mui/material/InputAdornment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

      // checks password validity on the fly
      const passwordValidationError = validatePassword(val);
      setPasswordError(passwordValidationError);
  
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

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number.';
    }
    return '';
  };
  
      const handleSubmit = (event) =>{
          event.preventDefault()

          // password error checking happens in handleChangePassword, not here
          if (passwordError) {
            return;
          }
  
          if(firstName === '' || lastName === '' || email === '' || username === '' || password === '' || confirmPassword === ''){
              return;
          }
  
          if(nameError !== "") {
              return;
          }
  
          if(lastNameError !== "") {
              return;
          }
  
          if(emailError !== "") {
              return;
          }
  
          if(usernameError !== "") {
              return;
          }
  
          if(confirmPasswordError !== "") {
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
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-purple-50'>

      <Box 
        component="form" 
        validate="true" 
        sx={{
          width: '100%',
          maxWidth: '550px',
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
          Create Account
        </Typography>

        <div className="grid grid-cols-2 gap-4 w-full">
          <TextField
            label="First Name"
            autoComplete="given-name"
            id="firstName"
            name="firstName"
            fullWidth
            error={nameError !== ""}
            helperText={nameError !== "" ? nameError : ""}
            onChange={handleChangeFirstName}
            sx={textFieldStyles}
          />

          <TextField
            label="Last Name"
            autoComplete="family-name"
            id="lastName"
            name="lastName"
            fullWidth
            error={lastNameError !== ""}
            helperText={lastNameError !== "" ? lastNameError : ""}
            onChange={handleChangeLastName}
            sx={textFieldStyles}
          />
        </div>

        <TextField
          label="Email"
          autoComplete="email"
          id="email"
          name="email"
          fullWidth
          error={emailError !== ""}
          helperText={emailError !== "" ? emailError : ""}
          onChange={handleChangeEmail}
          sx={textFieldStyles}
        />

        <TextField
          label="Username"
          id="username"
          name="username"
          fullWidth
          error={usernameError !== ""}
          helperText={usernameError !== "" ? usernameError : ""}
          onChange={handleChangeUsername}
          sx={textFieldStyles}
        />

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
                  sx={{ 
                    textTransform: 'none',
                    color: '#6B21A8',
                  }}
                >
                {showPassword ? <RemoveRedEyeIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}

                </Button>
              </InputAdornment>
            ),
          }}
          sx={textFieldStyles}
        />

        <TextField
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          fullWidth
          error={confirmPasswordError !== ""}
          helperText={confirmPasswordError !== "" ? confirmPasswordError : ""}
          onChange={handleChangeConfirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  sx={{ 
                    textTransform: 'none',
                    color: '#6B21A8',
                  }}
                >
                {showConfirmPassword ? <RemoveRedEyeIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}

                </Button>
              </InputAdornment>
            ),
          }}
          sx={textFieldStyles}
        />

        <Button 
          variant='contained' 
          onClick={handleSubmit}
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
          Create Account
        </Button>

        <Typography variant="body2" sx={{ color: 'rgba(107, 33, 168, 0.6)', mt: 2 }}>
          Already have an account?{' '}
          <Link href="/login" className="text-purple-700 hover:text-purple-900 font-medium">
            Sign in
          </Link>
        </Typography>
      </Box>
    </div>
  );
}



const textFieldStyles = {
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
};

export default Register;