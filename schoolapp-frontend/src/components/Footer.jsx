import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#531c70', bottom: 0, width: '100%'}}>
      <Toolbar>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '16px' }}>
          <Typography variant="h3" style={{ fontFamily: 'Roboto', color: 'gold', marginTop: '30px', marginBottom: '4px', fontWeight: 'bold' }}>
            Wave
          </Typography>

          <Typography variant="body2" color="white" style={{ marginBottom: '15px' }}>
            &copy; 2024 Wave Corporation. All rights reserved.
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
