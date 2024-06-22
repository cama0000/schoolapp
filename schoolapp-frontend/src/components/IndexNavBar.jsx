import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const IndexNavBar = () => {
  return (
    <div className='bg-purple-500 w-screen h-16 flex items-center justify-between px-4'>
      <span className="text-6xl font-bold">
        Wave
      </span>

      <div className='flex space-x-4'>
      <Link href="/login" passHref>
        <Button className="text-white">
          Login
        </Button>
      </Link>
        
      <Link href="/register" passHref>
        <Button className="text-white">
          Register
        </Button>
      </Link>
      </div>


    </div>
  )
}

export default IndexNavBar