import IndexNavBar from '@/components/IndexNavBar'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <div>
        <IndexNavBar/>
        
        <Link href="/register" passHref>
            <Button>
                Register
            </Button>
        </Link>
    </div>
  )
}

export default index