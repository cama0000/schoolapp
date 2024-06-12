import ProtectedRoutes from '@/components/ProtectedRoutes';
import SideBar from '@/components/SideBar';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

const Home = () => {
  const { student, logout } = useAuth();

  return (
    <div className="flex-1 flex flex-col items-center mt-12">
      <span className="text-6xl font-bold">
        Welcome, {student?.firstName}.
      </span>

      <span className="text-xl mt-8">
        Here are your upcoming deadlines.
      </span>
    </div>
  );
};

export default ProtectedRoutes(Home);
