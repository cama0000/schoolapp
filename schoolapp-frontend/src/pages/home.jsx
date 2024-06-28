import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { deleteTask, getPagesByStudent, getTasksByStudent, markCompleted } from '@/services/client';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';

const Home = () => {
  const { student, setCourseFromId} = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [pages, setPages] = useState([]);
  const [yesterdayPages, setYesterdayPages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (student) {
      fetchTasks();
      fetchPages();
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

  const fetchPages = async () => {
    try {
      const pageData = await getPagesByStudent(student?.id);

      setPages(pageData);
      
      const startOfYesterday = dayjs().subtract(1, 'day').startOf('day');
      const endOfYesterday = dayjs().subtract(1, 'day').endOf('day');

      const filteredPages = pageData.filter((page) => 
        dayjs(page.updatedAt).isAfter(startOfYesterday) && dayjs(page.updatedAt).isBefore(endOfYesterday)
      );
  
      setYesterdayPages(filteredPages);
    } catch (err) {
      console.error("GETPAGES CLIENT ERROR: ", err);
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

      <span className="text-2xl mt-20 mb-5">
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
                  backgroundColor: task.completed ? '#34eb55' : task.deadline && dayjs(task.deadline).isBefore(dayjs()) ? 'red' : 'background.paper'
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

      <span className="text-2xl mt-20">
        Your recently visited pages.
      </span>

      {pages.length > 0 ? (
        <div className="pages-container p-4 m-2 mb-10 border rounded">
          {pages.map((mappedPage) => (
            <div key={mappedPage.id} className="page-item">
              <Box
                className="page-item mx-4 mt-7 mb-7"
                p={3}
                boxShadow={3}
                borderRadius={4}
                bgcolor="background.paper"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width={1000}
                minHeight={80}
                onClick={()=>{
                  setCourseFromId(mappedPage.courseId);
                  router.push(`/page/${encodeURIComponent(mappedPage.id)}`);
                }}
                // onMouseEnter={() => handleMouseEnter(page.id)}
                // onMouseLeave={handleMouseLeave}
                position="relative"
                sx={{
                  backgroundColor: 'background.paper', cursor: 'pointer'
                }}
              >
                {/* {hoveredTaskId === task.id && (
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
                  </>
                )} */}

                <div className="page-details">
                  <h3 className="page-title font-bold">{mappedPage.title}</h3>
                  {/* <p className="page-description">{mappedPage.}</p> */}
                </div>
                {mappedPage.timeUpdated && (
                  <p>
                    Last Updated: {dayjs(mappedPage.timeUpdated).format('MMMM DD, YYYY h:mm A')}
                  </p>
                )}
              </Box>
            </div>
          ))}
        </div>
      ) : (
        <p>No pages!</p>
      )}
    </div>
  );
};

export default ProtectedRoutes(Home);
