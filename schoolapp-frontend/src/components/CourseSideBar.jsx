import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { addPage, deletePage, getPagesByCourse } from '@/services/client';
import dayjs from 'dayjs';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CourseSideBar = () => {
  const router = useRouter();
  const { course, student } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState(false);
  const [pages, setPages] = useState(null);
  const { page } = useAuth();
  const [hoveredPageId, setHoveredPageId] = useState(null);

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

    const page = { title, content: "", timeCreated: dayjs(), timeUpdated: dayjs(), courseId: course?.id, studentId: student?.id}
    await addPage(page);
    fetchPages();
    handleClose();

    toast.success("Page created successfully!");
  }

  const handleDeletePage = async (pageId) =>{
    await deletePage(pageId);
    router.push(`/courses/${encodeURIComponent(course.id)}`);
    fetchPages();
    toast.success("Page removed successfully!");
  }

  return (
    <div className='hidden md:flex fixed top-0 flex-col ml-7 h-full w-48 bg-purple-300 text-white'>
      <div className="w-full flex justify-center">
        <span className="text-3xl font-bold mt-5">
          {course?.courseName}
        </span>
      </div>

      <div className='mt-4 ml-2'>
        <span 
          style={{ 
            cursor: 'pointer', 
            display: 'inline-block', 
            padding: '5px 110px 5px 20px',
            margin: '0 100px 0 auto',
            borderRadius: '8px'
          }} 
          className={`${router.pathname.startsWith('/courses/') ? 'bg-purple-500' : ''} hover:bg-purple-500 rounded-lg`} 
          onClick={() => {
            router.push(`/courses/${encodeURIComponent(course?.id)}`)
          }}>
          Home
        </span>
      </div>

      <div className='flex flex-row mt-10 ml-2'>
        <span>
          Notebook
        </span>
        <AddIcon style={{color: 'gray', width: '15px', cursor: 'pointer', marginLeft: '4px', marginTop: '1px'}} onClick={handleOpen}/>
      </div>

      {/* map pages */}
      {/* <div className='ml-2'>
        {pages?.length > 0 ? (
          pages.map((mappedPage) => (
            <div 
            style={{ 
              cursor: 'pointer', 
              display: 'inline-block', 
              padding: '5px 40px 5px 20px',
              margin: '0 100px 0 auto',
              borderRadius: '8px',
            }} 
            onMouseEnter={()=>setHoveredPageId(mappedPage.id)}
            onMouseLeave={()=>setHoveredPageId(null)}
            key={mappedPage.id} className={`page-item ${ page?.id === mappedPage?.id ? 'bg-purple-500' : '' } title-overflow hover:cursor-pointer hover:bg-purple-500 rounded-lg mt-2`} onClick={()=>{router.push(`/page/${encodeURIComponent(mappedPage.id)}`)}}>

            {hoveredPageId === mappedPage.id && (
                    <DeleteOutlineIcon
                      style={{
                        color: 'black',
                        cursor: 'pointer',
                      }}

                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeletePage(mappedPage.id)}}
                    />
                    
                    )}
              <ArticleIcon className='mr-2'/>
              <span>
                {mappedPage.title}
              </span>
            </div>
          ))
        ) : (
          null
        )}
      </div> */}
{/* 
<div className='ml-2'>
  {pages?.length > 0 ? (
    pages.map((mappedPage) => (
      <div 
        key={mappedPage.id}
        style={{ 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '5px 20px',
          margin: '0 100px 0 auto',
          borderRadius: '8px',
          position: 'relative', // Required for absolute positioning of the icon
        }} 
        className={`page-item ${page?.id === mappedPage?.id ? 'bg-purple-500' : ''} title-overflow hover:cursor-pointer hover:bg-purple-500 rounded-lg mt-2`}
        onMouseEnter={() => setHoveredPageId(mappedPage.id)}
        onMouseLeave={() => setHoveredPageId(null)}
        onClick={() => { router.push(`/page/${encodeURIComponent(mappedPage.id)}`); }}
      >
        <DeleteOutlineIcon
          style={{
            color: 'black',
            cursor: 'pointer',
            visibility: hoveredPageId === mappedPage.id ? 'visible' : 'hidden',
            position: 'absolute',
            left: '0',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleDeletePage(mappedPage.id);
          }}
        />
        <ArticleIcon className='mr-2' />
        <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {mappedPage.title}
        </span>
      </div>
    ))
  ) : (
    null
  )}
</div> */}


<div className='ml-2'>
  {pages?.length > 0 ? (
    pages.map((mappedPage) => (
      <div 
        key={mappedPage.id}
        style={{ 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '5px 40px',
          margin: '0 10px 0 auto',
          borderRadius: '8px',
          position: 'relative', // Required for absolute positioning of the icon
        }} 
        className={`page-item ${page?.id === mappedPage?.id ? 'bg-purple-500' : ''} title-overflow hover:cursor-pointer hover:bg-purple-500 rounded-lg mt-2`}
        onMouseEnter={() => setHoveredPageId(mappedPage.id)}
        onMouseLeave={() => setHoveredPageId(null)}
        onClick={() => { router.push(`/page/${encodeURIComponent(mappedPage.id)}`); }}
      >
        <DeleteOutlineIcon
          style={{
            color: 'black',
            cursor: 'pointer',
            visibility: hoveredPageId === mappedPage.id ? 'visible' : 'hidden',
            position: 'absolute',
            left: '0',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleDeletePage(mappedPage.id);
          }}
        />
        <ArticleIcon className='mr-2' />
        <span className="title-overflow">
          {mappedPage.title}
        </span>
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
