import ProtectedRoutes from '@/components/ProtectedRoutes'
import React from 'react'

const home = () => {
  return (
    <div>home</div>
  )
}

export default ProtectedRoutes(home)