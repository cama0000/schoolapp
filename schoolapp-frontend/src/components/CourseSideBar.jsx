import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { addPage, getPagesByCourse } from '@/services/client';
import dayjs from 'dayjs';

const CourseSideBar = () => {
  const router = useRouter();
  const { course } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState(false);
  const [pages, setPages] = useState(null);

  useEffect(()=>{
    if(course?.id){
      fetchPages();
    }
  }, [course?.id])

  const fetchPages = async () =>{
    const pageData = await getPagesByCourse(course?.id);
    setPages(pageData);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();

    const page = { title, content: "", timeCreated: dayjs(), timeUpdated: dayjs(), courseId: course?.id}
    await addPage(page);
    fetchPages();
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

      {/* map pages */}
      <div className='ml-8'>
        {pages?.length > 0 ? (
          pages.map((page) => (
            <div key={page.id} className="page-item hover:cursor-pointer" onClick={()=>{router.push(`/page/${encodeURIComponent(page.id)}`)}}>
              {page.title}
            </div>
          ))
        ) : (
          null
        )}
      </div>




      {/* CREATE PAGE */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        component="form" validate="true" onSubmit={handleSubmit}
        disableScrollLock={true}
      >
        <DialogTitle>Add Page</DialogTitle>
        <DialogContent>

            <DialogContentText>
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
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
            />

            <br/>
            <br/>

        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</Button>
            <Button variant="contained" type="submit" onSubmit={handleSubmit} color="primary">Add</Button>
        </DialogActions>

    </Dialog>




    </div>
  );
}

export default CourseSideBar;
