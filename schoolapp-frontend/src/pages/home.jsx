import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { deleteTask, getPagesByStudent, getTasksByStudent, markCompleted } from '@/services/client';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import ArticleIcon from '@mui/icons-material/Article';

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
      
      // Sort pages by update time and take only the 6 most recent
      const sortedPages = pageData.sort((a, b) => 
        dayjs(b.timeUpdated).valueOf() - dayjs(a.timeUpdated).valueOf()
      ).slice(0, 6);
      
      setPages(sortedPages);
      
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
    <div className="flex-1 flex flex-col max-w-7xl mx-auto px-8 py-12">
      {/* Welcome Section */}
      <div className="mb-16 text-center">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
          Welcome, {student?.firstName}!
        </h1>
        <p className="mt-4 text-xl text-purple-600">
          Today is {dayjs().format('MMMM DD, YYYY')}.
        </p>
      </div>

      {/* Tasks Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-2">Upcoming Deadlines</h2>
            <p className="text-purple-600">Stay on track.</p>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.length > 0 ? (
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
                No upcoming deadlines. You're all caught up!
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-purple-900 mb-2">Recent Pages</h2>
            <p className="text-purple-600">Refresh your memory.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.length > 0 ? (
            pages.map((page) => (
              <div
                key={page.id}
                className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer border border-purple-100/50"
                onClick={() => {
                  setCourseFromId(page.courseId);
                  router.push(`/page/${encodeURIComponent(page.id)}`);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <ArticleIcon className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-purple-900 mb-1">
                      {page.title}
                    </h3>
                    <p className="text-sm text-purple-600">
                      Last updated: {dayjs(page.timeUpdated).format('MMM DD, YYYY h:mm A')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-16 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-purple-600 text-lg">
                No pages yet. Create one in your courses!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes(Home);
