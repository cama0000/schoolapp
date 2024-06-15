import React, { useEffect, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { addCourse, getStudentCourses } from '@/services/client';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import DeleteIcon from '@mui/icons-material/Delete';

const Courses = () => {
  const { student } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [courseName, setCourseName] = useState(null);
  const [subject, setSubject] = useState(null);

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const course = { courseName, subject, studentId: student?.id }
    await addCourse(course);
    fetchCourses();
    handleClose();
  }

  return (
    <div className="flex-1 flex flex-col items-center mt-12">
      <span className="text-6xl font-bold">
        {student?.firstName}'s Courses
      </span>

      <Button style={{ color: 'purple' }}>
        <AddBoxIcon onClick={handleOpen}/>
      </Button>

      {groupedCourses.length > 0 ? (
        <div className="courses-container mt-8">
          {groupedCourses.map((courseRow, rowIndex) => (
            <div key={rowIndex} className="course-row flex justify-center">
              {courseRow.map((course) => (
                <div key={course.id} className="course-item mx-4">
                  <Box
                    key={course.id}
                    className="course-item mx-4 mt-7"
                    p={6}
                    boxShadow={3}
                    borderRadius={4}
                    bgcolor="background.paper"
                    height={200}
                    width={300}
                    display="flex"
                    flexDirection="column"
                    position="relative"
                  >
                    <DeleteIcon
                      style={{
                        color: 'red',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        cursor: 'pointer',
                      }}
                    />
                    <div>{course.courseName}</div>
                    <div className='italic'>{course.subject}</div>
                  </Box>
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





      <Dialog
        open={isOpen}
        onClose={handleClose}
        component="form" validate="true" onSubmit={handleSubmit}
        disableScrollLock={true}
      >
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>

            <DialogContentText>
                Create a course.
            </DialogContentText>

            <TextField
                autoFocus
                required
                margin="dense"
                id="courseName"
                name="courseName"
                label="Course Name"
                type="string"
                fullWidth
                variant="standard"
                onChange={(e) => setCourseName(e.target.value)}
            />

            <TextField
                autoFocus
                required
                margin="dense"
                id="subject"
                name="subject"
                label="Subject"
                type="string"
                fullWidth
                variant="standard"
                onChange={(e) => setSubject(e.target.value)}
            />

            <br/>
            <br/>

        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit" onSubmit={handleSubmit} color="primary">Create</Button>
        </DialogActions>

    </Dialog>
    </div>
  );
};

export default ProtectedRoutes(Courses);