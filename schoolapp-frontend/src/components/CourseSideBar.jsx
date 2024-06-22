import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';

const CourseSideBar = () => {
  const router = useRouter();
  const { student } = useAuth();

  return (
    <div className='h-full w-64 bg-gray-300 text-white'>
      Notebookdsklfdsklfdsfdslmdfskl
    </div>
  );
}

export default CourseSideBar;
