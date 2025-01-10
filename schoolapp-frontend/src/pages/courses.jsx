import React, { useEffect, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { addCourse, deleteCourse, getStudentCourses } from '@/services/client';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Head from 'next/head';

const Courses = () => {
  const { student } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [courseName, setCourseName] = useState(null);
  const [subject, setSubject] = useState(null);
  const [hoveredCourseId, setHoveredCourseId] = useState(null);

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

  const handleMouseEnter = (courseId) => {
    setHoveredCourseId(courseId);
  };

  const handleMouseLeave = () => {
    setHoveredCourseId(null);
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const course = { courseName, subject, studentId: student?.id }
    await addCourse(course);
    fetchCourses();
    handleClose();

    toast.success("Course added successfully!");
  }

  const handleDeleteCourse = async (courseId) =>{
    event.preventDefault();
    await deleteCourse(courseId);
    fetchCourses();
    toast.success("Course removed successfully!");
  }

  return (
    <>
      <div className="flex-1 flex flex-col max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
            My Courses
          </h1>
        </div>

        {/* Add Course Button */}
        <div className="flex justify-end mb-8">
          <Button 
            onClick={handleOpen}
            variant="contained"
            startIcon={<AddBoxIcon />}
            className="!rounded-full !px-6 !py-2"
            sx={{
              bgcolor: '#6B21A8',
              boxShadow: '0 4px 14px 0 rgba(107, 33, 168, 0.39)',
              '&:hover': {
                bgcolor: '#581c87',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px 0 rgba(107, 33, 168, 0.39)',
              }
            }}
          >
            Add Course
          </Button>
        </div>

          {/* Courses Grid */}
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link 
                  key={course.id} 
                  href={`/courses/${encodeURIComponent(course.id)}`} 
                  className="block group"
                >
                  <div
                    className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 border border-purple-100/50 h-[200px] flex flex-col"
                    onMouseEnter={() => handleMouseEnter(course.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {hoveredCourseId === course.id && (
                      <DeleteOutlineIcon
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteCourse(course.id);
                        }}
                      />
                    )}
                    <div className="flex-grow flex flex-col justify-center">
                      <h2 className="text-2xl font-bold text-purple-900 mb-2 group-hover:text-purple-700 transition-colors">
                        {course.courseName}
                      </h2>
                      <p className="text-purple-600 italic">
                        {course.subject}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-purple-600 text-lg">
                No courses available. Add a course to get started!
              </p>
            </div>
          )}

        {/* Add Course Dialog */}
        <Dialog
          open={isOpen}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <DialogTitle>
            <h2 className="text-2xl font-bold text-purple-900">
              Add Course
            </h2>
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="mb-4 text-purple-600">
              Add a new course to your dashboard.
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
              variant="outlined"
              onChange={(e) => setCourseName(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />

            <TextField
              required
              margin="dense"
              id="subject"
              name="subject"
              label="Subject"
              type="string"
              fullWidth
              variant="outlined"
              onChange={(e) => setSubject(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
          </DialogContent>

          <DialogActions sx={{ padding: '16px 24px' }}>
            <Button 
              onClick={handleClose}
              sx={{ 
                color: 'red',
                '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.04)' }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              variant="contained"
              sx={{ 
                bgcolor: '#6B21A8',
                borderRadius: '9999px',
                px: 4,
                '&:hover': { bgcolor: '#581c87' }
              }}
            >
              Add Course
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ProtectedRoutes(Courses);