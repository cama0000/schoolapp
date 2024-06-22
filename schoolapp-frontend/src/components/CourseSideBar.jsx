import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const CourseSideBar = () => {
  const router = useRouter();
  const { course } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();

    // const task = { taskName, description, deadline: deadline, courseId: selectedCourse?.id, studentId: student?.id}
    // await addTask(task);
    // fetchTasks();
    handleClose();

    toast.success("Page created successfully!");
  }

  return (
    <div className='hidden md:flex flex-col ml-7 h-full w-48 bg-purple-300 text-white'>
      <div className="w-full flex justify-center">
        <span className="text-3xl font-bold">
          {course?.courseName}
        </span>
      </div>

      <div className='mt-4 ml-2'>
        <span style={{ cursor: 'pointer' }} onClick={()=>{
          router.push(`/courses/${encodeURIComponent(course.id)}`)
        }}>
          Home
        </span>
      </div>

      <div className='flex flex-row mt-10 ml-2'>
        <span>
          Notebook
        </span>
        <AddIcon style={{color: 'gray', width: '15px', cursor: 'pointer'}} onClick={handleOpen}/>
      </div>




      {/* CREATE PAGE */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        component="form" validate="true" onSubmit={handleSubmit}
        disableScrollLock={true}
      >
        <DialogTitle>Create Page</DialogTitle>
        <DialogContent>

            <DialogContentText>
                Create a page.
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
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
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
}

export default CourseSideBar;
