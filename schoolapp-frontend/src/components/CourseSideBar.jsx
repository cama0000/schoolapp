import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';

const CourseSideBar = () => {
  const router = useRouter();
  const { student, course } = useAuth();

  return (
    <div className='hidden md:flex ml-7 h-full w-48 bg-purple-300 text-white'>
      <div className="w-full flex justify-center">
        <span className="text-6xl font-bold">
          {course.courseName}
        </span>
      </div>
    </div>
  );
}

export default CourseSideBar;
