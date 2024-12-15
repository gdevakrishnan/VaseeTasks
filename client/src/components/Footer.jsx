import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} VaseeTasks. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Developed by{' '}
        <Link
          href="https://techvaseegrah.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Tech Vaseegrah
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
