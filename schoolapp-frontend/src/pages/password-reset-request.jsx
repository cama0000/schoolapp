import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forgotPassword } from '@/services/client';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      setIsSubmitting(true);

      await forgotPassword(encodeURIComponent(email));

      toast.success('Password reset instructions sent!');
      setTimeout(() => router.push('/login'), 3000);
    } catch (error) {
      toast.error('Email is not associated with an account.');
      console.error('Password reset error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Reset Password
          </Typography>

          <Typography 
            variant="body1"
            className="text-center text-purple-600 -mt-2"
          >
            Enter your email address to receive password reset instructions.
          </Typography>

          <TextField
            type="email"
            label="Email Address"
            fullWidth
            value={email}
            error={!!emailError}
            helperText={emailError}
            onChange={(e) => setEmail(e.target.value)}
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
            {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
          </Button>
        </Box>
      </div>
    </>
  );
};

export default PasswordResetRequest;
