import ProtectedRoutes from '@/components/ProtectedRoutes';
import SideBar from '@/components/SideBar';
import { useAuth } from '@/context/AuthContext';
import { getTasksByStudent } from '@/services/client';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const { student, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    if(student){
      fetchTasks();
    }
  }, [student])

  const fetchTasks = async () => {
    try{
      setLoading(true);
      const data = await getTasksByStudent(student?.id);
      setTasks(data);
    }catch (err){
      console.error("GETTASKS CLIENT ERROR: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center mt-12">
      <span className="text-6xl font-bold">
        Welcome, {student?.firstName}.
      </span>

      <span className="text-xl mt-8">
        Here are your upcoming deadlines.
      </span>

      {tasks?.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task-item p-4 m-2 border rounded">
              <h3 className="task-title font-bold">{task.taskName}</h3>
              <p className="task-description">{task.description}</p>
              { task.deadline ? (
                <br/>,
                <p className="task-due-date">Due: {dayjs(task.deadline).format('MMMM DD, YYYY h:mm A')}</p>
              ) : (null)}
            </div>
          ))
        ) : (
          <p>No tasks available for this student.</p>
        )}

    </div>
  );
};

export default ProtectedRoutes(Home);
