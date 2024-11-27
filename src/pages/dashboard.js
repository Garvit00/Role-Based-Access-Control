import React, { useState } from 'react';
import UserManagement from '../componenets/UserManagement';
import RoleManagement from '../componenets/RoleManagement';
import { Button, Stack, AppBar, Toolbar, Box, useMediaQuery, useTheme } from '@mui/material';

const Dashboard = () => {
  const [view, setView] = useState('roles');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/*Header section*/}
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5',paddingBottom: isSmallScreen ? '16px' : '8px', }}>
        <Toolbar>
          <Stack  direction={isSmallScreen ? 'column' : 'row'} spacing={isSmallScreen ? 1 : 2}
            sx={{margin: isSmallScreen ? '0 auto' : '0 auto', alignItems: isSmallScreen ? 'center' : 'center',
            }}>
          <Button
               variant="contained"
               sx={{
                 backgroundColor: view === 'users' ? '#ff4081' : '#dedede',
                 color: view === 'users' ? '#fff' : '#3c3c3c',
                 '&:hover': { backgroundColor: view === 'users' ? '#e73370' : 'rgba(255, 255, 255, 0.1)' },
                 width: isSmallScreen ? '100%' : 'auto',
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
                width: isSmallScreen ? '100%' : 'auto',
              }}
              onClick={() => setView('roles')}
            >
              Role Management
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/*Content Section*/}
      <Box sx={{ padding: '40px' }}>
        {view === 'users' && <UserManagement />}
        {view === 'roles' && <RoleManagement />}
      </Box>
    </Box>
  );
};

export default Dashboard;

