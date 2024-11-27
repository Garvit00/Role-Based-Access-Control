import React, { useState } from 'react';
import UserManagement from '../componenets/UserManagement';
import RoleManagement from '../componenets/RoleManagement';
import { Button, Stack, AppBar, Toolbar, Box } from '@mui/material';

const Dashboard = () => {
  const [view, setView] = useState('users');

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/*Header section*/}
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Stack direction="row" spacing={2} sx={{ margin: '0 auto' }}>
          <Button
              variant="contained"
              sx={{
                backgroundColor: view === 'users' ? '#ff4081' : '#dedede',
                color: view === 'users' ? '#fff' : '#3c3c3c',
                '&:hover': { backgroundColor: view === 'users' ? '#e73370' : 'rgba(255, 255, 255, 0.1)' },
              }}
              onClick={() => setView('users')}
            >
              User Management
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: view === 'roles' ? '#ff4081' : '#dedede',
                color: view === 'roles' ? '#fff' : '#3c3c3c',
                '&:hover': { backgroundColor: view === 'roles' ? '#e73370' : 'rgba(255, 255, 255, 0.1)' },
              }}
              onClick={() => setView('roles')}
            >
              Role Management
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/*Content Section*/}
      <Box sx={{ padding: '20px' }}>
        {view === 'users' && <UserManagement />}
        {view === 'roles' && <RoleManagement />}
      </Box>
    </Box>
  );
};

export default Dashboard;

