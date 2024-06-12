import React, { useEffect, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';
import { getStudentCourses } from '@/services/client';
import { useAuth } from '@/context/AuthContext';

const Courses = () => {
  const { student } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    if(student?.id){
      fetchCourses();
    }
  }, [student?.id]);

  const fetchCourses = async () => {
    try{
      setLoading(true);
      const data = await getStudentCourses(student?.id);
      setCourses(data);
    }catch (err){
      console.error("GETCOURSES CLIENT ERROR: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error loading courses: {error.message}</div>;

  const groupedCourses = [];
  for(let i = 0; i < courses.length; i += 3) {
    groupedCourses.push(courses.slice(i, i + 3));
  }

  return (
    <div className="flex-1 flex flex-col items-center mt-12">
      <span className="text-6xl font-bold">
        {student?.firstName}'s Courses
      </span>

      <Button style={{ color: 'purple' }}>
        <AddBoxIcon />
      </Button>

      {groupedCourses.length > 0 ? (
        <div className="courses-container mt-8">
          {groupedCourses.map((courseRow, rowIndex) => (
            <div key={rowIndex} className="course-row flex justify-center">
              {courseRow.map((course) => (
                <div key={course.id} className="course-item mx-4">
                  <div>{course.courseName}</div>
                  <div>{course.subject}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <span className="text-xl mt-8">
          No courses available. Add some!
        </span>
      )}
    </div>
  );
};

export default Courses;
