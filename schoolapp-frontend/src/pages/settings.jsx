import ProtectedRoutes from '@/components/ProtectedRoutes';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Settings = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { authDeleteAccount } = useAuth();
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      await authDeleteAccount();
      toast.success("Account deletion successful.");
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error("Error deleting account.");
    }
    setOpenDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="mb-6">
        Settings
      </Typography>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="border-b pb-4 mb-4">
          <Typography variant="h6" className="text-red-600 mb-2">
            Danger Zone
          </Typography>
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => setOpenDialog(true)}
          >
            Delete Account
          </Button>
        </div>
      </div>




      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProtectedRoutes(Settings);