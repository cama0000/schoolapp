import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { addTask, deleteTask, getCourse, getTasksByCourse, markCompleted, getPagesByCourse, deletePage, addPage } from '@/services/client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CoursePage = () => {
  const router = useRouter();
  const { course } = router.query;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { student } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [taskName, setTaskName] = useState(null);
  const [description, setDescription] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const { setCourseFromId, setPageFromId } = useAuth();
  const [pages, setPages] = useState([]);
  const [hoveredPageId, setHoveredPageId] = useState(null);
  const [isPageDialogOpen, setPageDialogOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    if(course) {
      fetchCourse(course);
      setCourseFromId(course);
      setPageFromId(null);
    }
  }, [course]);

  // check if the student actually has this course
  useEffect(() => {
    if(selectedCourse && student?.id !== selectedCourse?.studentId){
      router.push('/home');
    }

    fetchTasks(selectedCourse?.id);
  }, [selectedCourse, student?.id]);

  const fetchCourse = async (courseId) => {
    try {
      const courseData = await getCourse(courseId);
      setSelectedCourse(courseData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const fetchTasks = async () => {
    try{
      setLoading(true);
      console.log("TRYING WITH COURSE ID: " + selectedCourse?.id);
      const data = await getTasksByCourse(selectedCourse?.id);
      setTasks(data);
    }catch (err){
      console.error("GETTASKS CLIENT ERROR: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDeadline(null);
    setDescription(null);
    setOpen(false);
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();

    const task = { taskName, description, deadline: deadline, courseId: selectedCourse?.id, studentId: student?.id}
    await addTask(task);
    fetchTasks();
    handleClose();

    toast.success("Task added successfully!");
  }

  const handleMouseEnter = (taskId) => {
    setHoveredTaskId(taskId);
  };

  const handleMouseLeave = () => {
    setHoveredTaskId(null);
  };

  const handleDeleteTask = async (taskId) =>{
    event.preventDefault();
    await deleteTask(taskId);
    fetchTasks();
    toast.success("Task removed successfully!");
  }

  const handleMarkCompleted = async (taskId) =>{
    event.preventDefault();
    const task = {id: taskId};
    await markCompleted(task);
    fetchTasks();
    toast.success("Task complete!");
  }

  const fetchPages = useCallback(async () => {
    if (selectedCourse?.id) {
      const pageData = await getPagesByCourse(selectedCourse.id);
      setPages(pageData);
    }
  }, [selectedCourse?.id]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleDeletePage = async (pageId) => {
    await deletePage(pageId);
    fetchPages();
    toast.success("Page removed successfully!");
  }

  const handlePageDialogOpen = () => {
    setPageDialogOpen(true);
  };

  const handlePageDialogClose = () => {
    setPageTitle('');
    setPageDialogOpen(false);
  };

  const handleCreatePage = async (event) => {
    event.preventDefault();

    const page = { 
      title: pageTitle, 
      content: "", 
      timeCreated: dayjs(), 
      timeUpdated: dayjs(), 
      courseId: selectedCourse?.id, 
      studentId: student?.id
    };

    await addPage(page);
    fetchPages();
    handlePageDialogClose();
    toast.success("Page created successfully!");
  };

  if (!selectedCourse) return <div>Loading...</div>;

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto px-8 py-12">
      <div className="mb-8">
        <Button
          onClick={() => router.push('/courses')}
          startIcon={<ArrowBackIcon />}
          className="!normal-case !text-purple-600 hover:!bg-purple-50"
          sx={{ 
            borderRadius: '9999px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateX(-4px)',
            }
          }}
        >
          Back to Courses
        </Button>
      </div>

      <div className="mb-16 text-center">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
          {selectedCourse.courseName}
        </h1>
        <p className="mt-4 text-xl text-purple-600">
          {selectedCourse.subject}
        </p>
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-purple-900 mb-2">Notebook</h2>
          </div>
          <div className="ml-8">
            <Button 
              onClick={handlePageDialogOpen}
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
              New Page
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pages?.length > 0 ? (
            pages.map((page) => (
              <div
                key={page.id}
                className="relative group bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredPageId(page.id)}
                onMouseLeave={() => setHoveredPageId(null)}
                onClick={() => router.push(`/page/${encodeURIComponent(page.id)}`)}
              >
                <div className="flex items-center gap-3">
                  <ArticleIcon className="text-purple-600" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-purple-900 truncate">
                      {page.title}
                    </h3>
                    <p className="text-sm text-purple-600">
                      Last updated: {dayjs(page.timeUpdated).format('MMM DD, YYYY')}
                    </p>
                  </div>
                  
                  {hoveredPageId === page.id && (
                    <DeleteOutlineIcon
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePage(page.id);
                      }}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 bg-purple-50 rounded-xl">
              <p className="text-purple-600">No pages yet. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-purple-900 mb-2">Tasks</h2>
          </div>
          <div className="ml-8">
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
              New Task
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border
                  ${task.completed 
                    ? 'bg-green-50 border-green-200' 
                    : task.deadline && dayjs(task.deadline).isBefore(dayjs())
                      ? 'bg-red-50 border-red-200'
                      : 'border-purple-100/50'
                  }`}
                onMouseEnter={() => handleMouseEnter(task.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h3 className={`text-lg font-semibold mb-1 ${
                      task.completed ? 'text-green-700' : 
                      task.deadline && dayjs(task.deadline).isBefore(dayjs()) ? 'text-red-700' : 
                      'text-purple-900'
                    }`}>
                      {task.taskName}
                    </h3>
                    {task.description && (
                      <p className="text-purple-600 mb-2">{task.description}</p>
                    )}
                    {task.deadline && (
                      <p className={`text-sm ${
                        task.completed ? 'text-green-600' :
                        dayjs(task.deadline).isBefore(dayjs()) ? 'text-red-600' :
                        'text-purple-500'
                      }`}>
                        Due: {dayjs(task.deadline).format('MMMM DD, YYYY h:mm A')}
                      </p>
                    )}
                  </div>

                  {hoveredTaskId === task.id && (
                    <div className="flex items-center gap-2 ml-4">
                      {!task.completed && (
                        <Button
                          onClick={() => handleMarkCompleted(task.id)}
                          className="!min-w-0 !p-2 !rounded-full"
                          sx={{
                            bgcolor: 'rgba(16, 185, 129, 0.1)',
                            '&:hover': { 
                              bgcolor: 'rgba(16, 185, 129, 0.2)',
                            }
                          }}
                        >
                          <AssignmentTurnedInIcon 
                            className="text-green-600"
                          />
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteTask(task.id)}
                        className="!min-w-0 !p-2 !rounded-full"
                        sx={{
                          bgcolor: 'rgba(239, 68, 68, 0.1)',
                          '&:hover': { 
                            bgcolor: 'rgba(239, 68, 68, 0.2)',
                          }
                        }}
                      >
                        <DeleteOutlineIcon 
                          className="text-red-500"
                        />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-purple-600 text-lg">
                No tasks yet. Create one to get started!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CREATE TASK */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          component="form"
          onSubmit={handleSubmit}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <DialogTitle>
            <Typography variant="h5" className="font-bold text-purple-900">
              Add Task
            </Typography>
          </DialogTitle>

          <DialogContent>
            <DialogContentText className="mb-4 text-purple-600">
              Add a task for this course.
            </DialogContentText>

            <TextField
              autoFocus
              required
              margin="dense"
              id="taskName"
              name="taskName"
              label="Task Name"
              type="string"
              fullWidth
              variant="outlined"
              onChange={(e) => setTaskName(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />

            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="string"
              fullWidth
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />

            <DateTimePicker
              label="Deadline"
              onChange={(e) => setDeadline(e)}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
              slotProps={{
                textField: {
                  variant: 'outlined',
                }
              }}
              disablePast
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
              variant="contained" 
              type="submit"
              sx={{ 
                bgcolor: '#6B21A8',
                borderRadius: '9999px',
                px: 4,
                '&:hover': { bgcolor: '#581c87' }
              }}
            >
              Create Task
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>

      {/* New Page Dialog */}
      <Dialog
        open={isPageDialogOpen}
        onClose={handlePageDialogClose}
        component="form"
        onSubmit={handleCreatePage}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" className="font-bold text-purple-900">
            Add Page
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText className="mb-4">
            Add a page to your notebook.
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="string"
            fullWidth
            variant="outlined"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button 
            onClick={handlePageDialogClose}
            sx={{ 
              color: 'red',
              '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.04)' }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            type="submit"
            sx={{ 
              bgcolor: '#6B21A8',
              borderRadius: '9999px',
              '&:hover': { bgcolor: '#581c87' }
            }}
          >
            Create Page
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProtectedRoutes(CoursePage);

