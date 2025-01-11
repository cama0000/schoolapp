import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { resetPassword } from '@/services/client';

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  const isRouterReady = router.isReady;

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setConfirmError('');

    console.log("INSIDEO F SUBMIT");

    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    console.log("INSIDEO F SUBMIT 2");


    if (newPassword !== confirmPassword) {
      setConfirmError('Passwords do not match');
      return;
    }

    console.log("INSIDEO F SUBMIT 3");


    try {
      setIsSubmitting(true);

      console.log("TOKEN: " + token);
      console.log("New password: " + newPassword);

      const payload = { token, newPassword };

      await resetPassword(payload);
      toast.success('Password reset successfully!');
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
      console.error('Password reset error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isRouterReady || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 via-white to-purple-50">
        <Typography variant="h6">Loading...</Typography>
      </div>
    );
  }

  return (
    <>
      
      <div className='min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-purple-50'>
        <Box 
          component="form" 
          onSubmit={handleSubmit}
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
          <div className="w-full flex justify-start">
            <Link 
              href="/login"
              className="text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
            >
              <ArrowBackIcon fontSize="small" />
              Back to Login
            </Link>
          </div>

          <Typography 
            variant="h4" 
            component="h1"
            className="text-center font-bold text-purple-900"
          >
            Reset Your Password
          </Typography>

          <Typography 
            variant="body1"
            className="text-center text-purple-600 -mt-2"
          >
            Please enter your new password below
          </Typography>

          <TextField
            type="password"
            label="New Password"
            fullWidth
            value={newPassword}
            error={!!passwordError}
            helperText={passwordError}
            onChange={(e) => setNewPassword(e.target.value)}
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

          <TextField
            type="password"
            label="Confirm Password"
            fullWidth
            value={confirmPassword}
            error={!!confirmError}
            helperText={confirmError}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

          <Typography variant="body2" className="text-purple-600 text-sm">
            Password must contain:
            <ul className="list-disc list-inside mt-1">
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{
              bgcolor: '#6B21A8',
              py: 1.5,
              textTransform: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              boxShadow: '0 4px 14px 0 rgba(107, 33, 168, 0.39)',
              '&:hover': {
                bgcolor: '#581c87',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px 0 rgba(107, 33, 168, 0.39)',
              }
            }}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Box>
      </div>
    </>
  );
};

export default PasswordReset;
