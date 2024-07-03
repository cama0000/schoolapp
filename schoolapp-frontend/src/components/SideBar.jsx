import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { sideBarLinks } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import { toast } from 'react-toastify';
import { getPagesBySearch } from '@/services/client';
import dayjs from 'dayjs';

const SideBar = () => {
  const router = useRouter();
  const { student, logout, setCourseFromId } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [pages, setPages] = useState([]);

  const handleSettingsClick = () => {
    router.push('/settings');
  };

  const handleLogoutClick = () => {
    toast.success("Logout Successful!");
    logout();
  };

  const handleClose = () => {
    setOpen(false);
    setTitle(null);
    setPages([]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSearch = async () =>{
    console.log("SEARCH QUERY: " + title);

    if(title !== ''){
      const search = { title, studentId: student?.id }
      const pageData = await getPagesBySearch(search);
      setPages(pageData);
    }
    else{
      setPages([]);
    }
  }

  useEffect(()=>{
    if(student){
      handleSearch();
    }
  }, [title]);

  return (
    <div className='hidden md:flex fixed top-0 left-0 h-full w-50 border-r border-blue-300'>
      <div className='flex flex-col gap-11 bg-purple-500 pr-11 pl-5 py-5 h-full'>
        <Link href="/" className="flex gap-3 items-center font-bold text-white text-4xl">
          Wave
        </Link>

        {/* <div>
          Profile Pic
        </div> */}

        <div>
          <em>{student?.username}</em>
        </div>

        <ul className="flex flex-col gap-6">
          {sideBarLinks.map((link) => (
            <li key={link.id}>
              { link.id !== 2 ? (
                <Link href={link.href} className="flex items-center gap-3">
                  <img src={link.imgURL} alt={link.label} className='w-6 h-6' />
                  <span className="text-white hover:text-black cursor-pointer">{link.label}</span>
              </Link>
              ) : (
                <div className="flex items-center gap-3 cursor-pointer" onClick={handleOpen}>
                  <img src={link.imgURL} alt={link.label} className='w-6 h-6' />
                  <span className="text-white hover:text-black cursor-pointer">{link.label}</span>
                </div>
              )}
              
            </li>
          ))}
          
          {/* <li className="flex items-center gap-3 mt-48" onClick={handleSettingsClick}>
            <img src="/assets/images/settings.png" alt="settings" className='w-6 h-6' />
            <span className="text-white hover:text-black cursor-pointer">Settings</span>
          </li> */}

          <li className="flex items-center mt-48 gap-9" onClick={handleLogoutClick}>
            <span className='ml-5 text-white hover:text-black cursor-pointer'>
              Logout
            </span>
          </li>
        </ul>
      </div>


      <Dialog
  open={isOpen}
  onClose={handleClose}
  component="form"
  validate="true"
  onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
  disableScrollLock={true}
  PaperProps={{
    style: {
      height: '80vh', // Set height
      width: '95vw',  // Set width
    },
  }}
>
  <DialogTitle>Search Notebook</DialogTitle>
  <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    <DialogContentText>
      Search for a page from one of your notebooks.
    </DialogContentText>

    <TextField
      autoFocus
      margin="dense"
      id="search"
      name="search"
      label="Search"
      type="search"
      fullWidth
      variant="outlined"
      value={title}
      onChange={(e) => {
        console.log("E TARGETT VALUE: " + e.target.value)
        setTitle(e.target.value);
        // handleSearch();
      }}
    />

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
              width={470}
              minHeight={80}
              onClick={()=>{
                setCourseFromId(mappedPage.courseId);
                router.push(`/page/${encodeURIComponent(mappedPage.id)}`);
                handleClose();
              }}
              position="relative"
              sx={{
                backgroundColor: 'background.paper', cursor: 'pointer'
              }}
            >
              <div className="page-details">
                <h3 className="page-title font-bold">{mappedPage.title}</h3>
              </div>
              {mappedPage.timeUpdated && (
                <p>
                  Last Updated: <em>{dayjs(mappedPage.timeUpdated).format('MMMM DD, YYYY h:mm A')}</em>
                </p>
              )}
            </Box>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <img src="/assets/images/search.png" alt="settings" className='w-48 h-48 mt-11' />
        <i className='ml-14 font-bold'>
          No results.
        </i>
      </div>
    )}

    <br />
    <br />

  </DialogContent>

</Dialog>



    </div>
  );
};

export default SideBar;
