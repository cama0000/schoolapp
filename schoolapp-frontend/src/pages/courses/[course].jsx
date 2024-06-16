// import ProtectedRoutes from '@/components/ProtectedRoutes';
// import { useAuth } from '@/context/AuthContext';
// import { getCourse } from '@/services/client';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react'

// const coursePage = () => {
//   const router = useRouter();
//   const { course } = router.query;
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const { student } = useAuth();

//   useEffect(()=>{
//     fetchCourse(course);

//     // console.log("STUDENTID: " + student?.id);
//     // console.log("COURSESTUDENTID: " + selectedCourse);

//     if(student?.id != selectedCourse?.studentId){
//       router.push('/home');
//     }
//   }, [course])

//   const fetchCourse = async (courseId) =>{
//     try{
//       const courseData = await getCourse(courseId);
//       setSelectedCourse(courseData);
//     } catch (error) {
//         console.error("Error fetching course data:", error);
//     }
//   }

//   return (
//     <div className="flex-1 flex flex-col items-center mt-12">
//       <span className="text-6xl font-bold">
//         {selectedCourse?.courseName}
//       </span>

//       <span className="text-xl mt-8">
//         Here are your tasks.
//       </span>
//     </div>
//   )
// }

// export default ProtectedRoutes(coursePage);

import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { getCourse } from '@/services/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const CoursePage = () => {
  const router = useRouter();
  const { course } = router.query;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { student } = useAuth();

  useEffect(() => {
    if (course) {
      fetchCourse(course);
    }
  }, [course]);

  // check if the student actually has this course
  useEffect(() => {
    if (selectedCourse && student?.id !== selectedCourse?.studentId) {
      router.push('/home');
    }
  }, [selectedCourse, student?.id]);

  const fetchCourse = async (courseId) => {
    try {
      const courseData = await getCourse(courseId);
      setSelectedCourse(courseData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  if (!selectedCourse) return <div>Loading...</div>;

  return (
    <div className="flex-1 flex flex-col items-center mt-12">
      <span className="text-6xl font-bold">
        {selectedCourse.courseName}
      </span>

      <span className="text-xl mt-8">
        Here are your tasks.
      </span>
    </div>
  );
};

export default ProtectedRoutes(CoursePage);
