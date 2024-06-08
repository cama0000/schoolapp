import ProtectedRoutes from '@/components/ProtectedRoutes'
import { useAuth } from '@/context/AuthContext';
import { Button } from '@mui/material'
import React from 'react'

const home = () => {
  const { logout } = useAuth();

  return (
    <div>home
      <Button onClick={logout}>
        LOGOUT
      </Button>
    </div>
  )
}

export default ProtectedRoutes(home)