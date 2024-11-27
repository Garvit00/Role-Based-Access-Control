import React, { useState, useEffect } from 'react';
import {Table,TableBody, TableCell,TableContainer,TableHead,TableRow,Button,TextField,Modal, Box,Select,DialogTitle,
  MenuItem, InputLabel,Stack,Snackbar,Alert, useMediaQuery, useTheme} from '@mui/material';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState({ name: '', permissions: [] });
  const [permissions] = useState(['Read', 'Write', 'Delete']);
  const [customPermission, setCustomPermission] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const apiUrl = "https://server-1rbb.onrender.com";

  useEffect(() => {
    fetch(`${apiUrl}/roles`)
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
        setFilteredRoles(data);
      })
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = roles.filter(
      (role) =>
        role.name.toLowerCase().includes(query) ||
        role.permissions.some((permission) => permission.toLowerCase().includes(query)));
        setFilteredRoles(filtered);
  };

  const handleOpenDialog = (role = null) => {
    if (role) {
      setCurrentRole(role);
      setIsEdit(true);
    } else {
      setCurrentRole({ id: '', name: '', permissions: [] });
      setIsEdit(false);
    }
    setOpenDialog(true);
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCustomPermission('');
    setIsOtherSelected(false);
  };

  const handleSaveRole = () => {
    if (isEdit) {
      fetch(`${apiUrl}/roles/${currentRole.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentRole),
      })
        .then((res) => res.json())
        .then((updatedRole) => {
          setRoles((prev) => prev.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
          setFilteredRoles(prev => prev.map((role) => (role.id === updatedRole.id ? updatedRole : role)))
          setSnackbarMessage('Role Updated successfully')
          setOpenSnackbar(true)
        });
    } else {
      fetch(`${apiUrl}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentRole, id: Date.now().toString() }),
      })
        .then((res) => res.json())
        .then((newRole) => {
          setRoles((prev) => [...prev, newRole]);
          setFilteredRoles((prev) => [...prev, newRole]);
          setSnackbarMessage('Role added successfully');
          setOpenSnackbar(true);
        });
    }
    handleCloseDialog();
  };

  const handleDeleteRole = (id) => {
    fetch(`${apiUrl}/roles/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setRoles((prev) => prev.filter((role) => role.id !== id));
      setFilteredRoles((prev) => prev.filter((role) => role.id !== id))
      setSnackbarMessage('Role Deleted');
      setOpenSnackbar(true);
    });
  };
  const handlePermissionChange = (event) => {
    const value = event.target.value;

    if (value.includes('Other')) {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
      setCustomPermission('');
    }

    setCurrentRole({
      ...currentRole,
      permissions: value.filter((perm) => perm !== 'Other'),
    });
  };

  const handleAddCustomPermission = () => {
    if (
      customPermission.trim() &&
      !currentRole.permissions.includes(customPermission.trim())
    ) {
      setCurrentRole((prev) => ({
        ...prev,
        permissions: [...prev.permissions, customPermission.trim()],
      }));
    }
    setCustomPermission('');
    setIsOtherSelected(false);
  };
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Stack 
      direction={isSmallScreen ? 'column' : 'row'}
      justifyContent={isSmallScreen ? 'center' : 'space-between'}
      alignItems={isSmallScreen ? 'center' : 'flex-start'}
      spacing={isSmallScreen ? 2 : 0} 
      sx={{
        mb: 3, 
        backgroundColor:'#f4ce8d', 
        padding: '20px'}}>
      <h2 style={{ margin: isSmallScreen ? '0 auto' : 0 }}>Role Management</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} 
        sx={{ width: isSmallScreen ? "100%" : '7rem', }}>
        Add Role
      </Button>
      <Stack direction={isSmallScreen ? 'column' :"row"} 
      spacing={2} sx={{alignItems: 'center', marginTop:isSmallScreen ? 2 : 0}}>
          <TextField
            label="Search Roles"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{width: isSmallScreen ? '100%' : 'auto', 
              backgroundColor: '#ebf1f1',}}
          />
        </Stack>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell
                 sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#07c9ea', 
                }}>Role Name</TableCell>
              <TableCell
                 sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#07c9ea', 
                }}>Permissions</TableCell>
              <TableCell
                 sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#07c9ea', 
                }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{backgroundColor: '#dee3e3'}}>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(", ")}</TableCell>
                <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenDialog(role)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openDialog} onClose={handleCloseDialog}>
      <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
        <DialogTitle>{isEdit ? 'Edit Role' : 'Add Role'}</DialogTitle>
        <Stack spacing={3}>
          <TextField
            label="Role Name"
            value={currentRole.name}
            onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
            <InputLabel required>Permissions</InputLabel>
            <Select
              multiple
              value={currentRole.permissions.concat(isOtherSelected ? ['Other'] : [])}
              onChange={handlePermissionChange}
              renderValue={(selected) => selected.join(', ')}
              required
            >
              {permissions.map((perm) => (
                <MenuItem key={perm} value={perm}>
                  {perm}
                </MenuItem>
              ))}
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          {isOtherSelected && (
            <div style={{ marginTop: 16 }}>
            <Stack spacing={3}>
              <TextField
                label="Custom Permission"
                value={customPermission}
                onChange={(e) => setCustomPermission(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <Button style={{marginBottom: 20}}
                variant='contained'
                color='info'
                onClick={handleAddCustomPermission}
                disabled={!customPermission.trim()}
              >
                Add Custom Permission
              </Button>
              </Stack>
            </div>
          )}
        </Stack>
        <Stack spacing={3}>
          <Button onClick={handleSaveRole} variant="contained" color="primary" style={{marginTop:20}}>
            Save
          </Button>
          <Button onClick={handleCloseDialog} variant="contained" color="secondary">
            Cancel
          </Button>
        </Stack>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RoleManagement;
