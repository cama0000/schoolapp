import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { addTask, deleteTask, getCourse, getTasksByCourse, markCompleted } from '@/services/client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CourseSideBar from '@/components/CourseSideBar';

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
  const { setCourseFromId } = useAuth();

  useEffect(() => {
    if (course) {
      fetchCourse(course);
      setCourseFromId(course);
    }
  }, [course]);

  // check if the student actually has this course
  useEffect(() => {
    if (selectedCourse && student?.id !== selectedCourse?.studentId) {
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

  if (!selectedCourse) return <div>Loading...</div>;

  return (
    <div className="flex-1 flex flex-col items-center mt-12">
      
      <span className="text-6xl font-bold">
        {selectedCourse.courseName}
      </span>

      {/* <span className="text-xl mt-8">
        Here are your tasks.
      </span> */}

      <Button style={{ color: 'purple' }}>
        <AddBoxIcon onClick={handleOpen}/>
      </Button>

      <div className='tasks-container p-4 m-2 mb-10 border rounded'>
      {tasks?.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <Box
              key={task.id}
              className="task-item mx-4 mt-7 mb-7"
              p={3}
              boxShadow={3}
              borderRadius={4}
              bgcolor="background.paper"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width={1000}
              minHeight={80}
              onMouseEnter={() => handleMouseEnter(task.id)}
              onMouseLeave={handleMouseLeave}
              position="relative"
              sx={{
                backgroundColor: task.completed ? '#34eb55' : task.deadline && dayjs(task.deadline).isBefore(dayjs()) ? 'red' : 'background.paper',
              }}
            >

            {hoveredTaskId === task.id && (
                  <>
                    <DeleteOutlineIcon
                      style={{
                        color: task.deadline && dayjs(task.deadline).isBefore(dayjs()) ? 'black' : 'red',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        cursor: 'pointer',
                      }}

                      onClick={() => handleDeleteTask(task.id)}
                    />

                    {!task.completed ? (
                      <AssignmentTurnedInIcon
                        style={{
                          color: task.deadline && dayjs(task.deadline).isBefore(dayjs()) ? 'black' : '#05ff5d',
                          position: 'absolute',
                          top: '10px',
                          right: '40px',
                          cursor: 'pointer',
                        }}

                        onClick={() => handleMarkCompleted(task.id)}
                      />
                    ) : null}

                  </>
              )}

              <div className="task-details">
                <h3 className="task-title font-bold">{task.taskName}</h3>
                <p className="task-description">{task.description}</p>
              </div>
              {task.deadline && (
                <p className="task-due-date">
                  {dayjs(task.deadline).format('MMMM DD, YYYY h:mm A')}
                </p>
              )}
            </Box>

          </div>
        ))
      ) : (
        <p>No tasks!</p>
      )}
      </div>







      {/* CREATE TASK */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        component="form" validate="true" onSubmit={handleSubmit}
        disableScrollLock={true}
      >
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>

            <DialogContentText>
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
                variant="standard"
                onChange={(e) => setTaskName(e.target.value)}
            />

            <TextField
                autoFocus
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="string"
                fullWidth
                variant="standard"
                onChange={(e) => setDescription(e.target.value)}
            />

            <DateTimePicker
                label="Deadline"
                onChange={(e) => setDeadline(e)}
    
                slotProps={{
                  textField: {
                    style: { marginTop: '20px' }
                  }
                }}
    
               disablePast
             />

            <br/>
            <br/>

        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit" onSubmit={handleSubmit} color="primary">Create</Button>
        </DialogActions>

    </Dialog>
    </LocalizationProvider>
    </div>
  );
};

export default ProtectedRoutes(CoursePage);

