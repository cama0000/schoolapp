import ProtectedRoutes from '@/components/ProtectedRoutes'
import SideBar from '@/components/SideBar';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@mui/material'
import React from 'react'

const home = () => {
  const { student, logout } = useAuth();

  return (
    <div>
      <SideBar/>

      <div className="ml-4">
        Welcome, { student.username }.
      </div>
    </div>
  )
}

export default ProtectedRoutes(home)