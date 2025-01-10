import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { sideBarLinks } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
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
    <div className='hidden md:flex fixed top-0 left-0 h-full'>
      <div className='w-72 bg-white border-r border-purple-100 shadow-lg flex flex-col h-full'>
        {/* Logo Section */}
        <Link href="/" className="p-6 border-b border-purple-100">
          <span className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
            Prism
          </span>
        </Link>

        {/* User Profile Section */}
        <div className="px-6 py-4 border-b border-purple-100">
          <Typography variant="subtitle1" className="text-purple-900 font-medium">
            Welcome,
          </Typography>
          <Typography variant="h6" className="text-purple-700 font-bold truncate">
            {student?.username}
          </Typography>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow px-3 py-6">
          <ul className="space-y-2">
            {sideBarLinks.map((link) => (
              <li key={link.id}>
                {link.id !== 2 ? (
                  <Link 
                    href={link.href} 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                              ${router.pathname === link.href 
                                ? 'bg-purple-100 text-purple-900' 
                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-900'}`}
                  >
                    <img src={link.imgURL} alt={link.label} className='w-5 h-5 opacity-75' />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={handleOpen}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                             text-gray-600 hover:bg-purple-50 hover:text-purple-900"
                  >
                    <img src={link.imgURL} alt={link.label} className='w-5 h-5 opacity-75' />
                    <span className="font-medium">{link.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="p-6 border-t border-purple-100">
          <button
            onClick={handleLogoutClick}
            className="w-full px-4 py-2 text-purple-600 font-medium rounded-lg
                     hover:bg-purple-50 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            bgcolor: 'background.paper',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" className="font-bold text-purple-900">
            Search Notebook
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search"
            type="search"
            fullWidth
            variant="outlined"
            value={title || ''}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mt: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />

          {pages.length > 0 ? (
            <div className="mt-6 space-y-4">
              {pages.map((page) => (
                <Box
                  key={page.id}
                  onClick={() => {
                    setCourseFromId(page.courseId);
                    router.push(`/page/${encodeURIComponent(page.id)}`);
                    handleClose();
                  }}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    cursor: 'pointer',
                    bgcolor: 'white',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <Typography variant="h6" className="font-bold text-purple-900">
                    {page.title}
                  </Typography>
                  {page.timeUpdated && (
                    <Typography variant="body2" className="text-purple-600 mt-1">
                      Last Updated: {dayjs(page.timeUpdated).format('MMMM DD, YYYY h:mm A')}
                    </Typography>
                  )}
                </Box>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <img src="/assets/images/search.png" alt="No results" className="w-32 h-32 mx-auto mb-4 opacity-50" />
              <Typography variant="body1" className="text-purple-600 font-medium">
                No results found
              </Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SideBar;
