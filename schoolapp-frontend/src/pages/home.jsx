import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { deleteTask, getTasksByStudent, markCompleted } from '@/services/client';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { toast } from 'react-toastify';

const Home = () => {
  const { student, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);

  useEffect(() => {
    if (student) {
      fetchTasks();
    }
  }, [student]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasksByStudent(student?.id);
      setTasks(data.filter((task) => !task.completed && (!task.deadline || dayjs(task.deadline).isAfter(dayjs()))));
    } catch (err) {
      console.error("GETTASKS CLIENT ERROR: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="flex-1 flex flex-col items-center mt-12">
      <span className="text-6xl font-bold">
        Welcome, {student?.firstName}.
      </span>

      <span className="text-xl mt-8">
        Here are your upcoming deadlines.
      </span>

      {tasks.length > 0 ? (
        <div className="tasks-container p-4 m-2 mb-10 border rounded">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <Box
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
          ))}
        </div>
      ) : (
        <p>No tasks!</p>
      )}
    </div>
  );
};

export default ProtectedRoutes(Home);
