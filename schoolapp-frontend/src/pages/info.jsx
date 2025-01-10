import Footer from '@/components/Footer';
import IndexNavBar from '@/components/IndexNavBar';
import { Typography } from '@mui/material';
import React from 'react';

const info = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <IndexNavBar />
      
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <Typography 
          variant="h1" 
          className="text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900"
          sx={{ 
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}
        >
          Coming Soon.
        </Typography>
        
        <Typography 
          variant="h5" 
          className="text-purple-700 text-center max-w-2xl"
          sx={{ opacity: 0.9 }}
        >
            Check back later.
        </Typography>
      </main>

      <Footer />
    </div>
  );
}

export default info;