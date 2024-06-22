import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

const CourseSideBar = () => {
  const router = useRouter();
  const { course } = useAuth();

  return (
    <div className='hidden md:flex flex-col ml-7 h-full w-48 bg-purple-300 text-white'>
      <div className="w-full flex justify-center">
        <span className="text-3xl font-bold">
          {course?.courseName}
        </span>
      </div>

      <div className='mt-4 ml-2'>
        <span style={{ cursor: 'pointer' }} onClick={()=>{
          router.push(`/courses/${encodeURIComponent(course.id)}`)
        }}>
          Home
        </span>
      </div>

      <div className='flex flex-row mt-10 ml-2'>
        <span>
          Notebook
        </span>
        <AddIcon style={{color: 'gray', width: '15px', cursor: 'pointer'}}/>
      </div>
    </div>
  );
}

export default CourseSideBar;
