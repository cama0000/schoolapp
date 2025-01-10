import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const IndexNavBar = () => {
  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <Link href="/" className='flex items-center'>
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
              prism
            </span>
          </Link>

          {/* Navigation Links */}
          <div className='hidden md:flex items-center space-x-8'>
            {/* <Link href="#features" className='text-purple-600 hover:text-purple-800 transition-colors'>
              Features
            </Link>
            <Link href="#pricing" className='text-purple-600 hover:text-purple-800 transition-colors'>
              Pricing
            </Link>
            <Link href="/info" className='text-purple-600 hover:text-purple-800 transition-colors'>
              Info
            </Link> */}
          </div>

          {/* Auth Buttons */}
          <div className='flex items-center space-x-4'>
            <Link href="/login" passHref>
              <Button 
                variant="text"
                className="text-purple-600 hover:text-purple-800 normal-case text-base font-medium"
              >
                Login
              </Button>
            </Link>
            
            <Link href="/register" passHref>
              <Button 
                variant="contained"
                className="!bg-purple-600 hover:!bg-purple-700 !px-6 !py-2 !rounded-full !normal-case 
                          !text-base !font-medium !text-white !shadow-md hover:!shadow-lg 
                          !transition-all duration-200 ease-in-out transform hover:!scale-105"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default IndexNavBar