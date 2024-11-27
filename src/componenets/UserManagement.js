import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", role: "", status: "" });
  const [selectedUser, setSelectedUser] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      });

    fetch("http://localhost:3001/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data.map((role) => role.name)));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query) ||
        user.id.toString().includes(query));
    setFilteredUsers(filtered);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setNewUser({ name: "", role: "", status: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    const newId = Date.now().toString();
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newUser, id: newId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prev) => [...prev, data]);
        setFilteredUsers((prev) => [...prev, data]);
        handleClose();
        setSnackbarMessage("User added successfully");
        setOpenSnackbar(true);
        setNewUser({ name: "", role: "", status: "" });
      })
      .catch((error) => {
        setSnackbarMessage("Error adding user", error);
        setOpenSnackbar(true);
      });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser({ ...user });
    handleOpenEdit();
  };

  const handleUpdateUser = () => {
    if (selectedUser) {
      fetch(`http://localhost:3001/users/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser, id: selectedUser.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers((prev) =>
            prev.map((user) => (user.id === selectedUser.id ? data : user))
          );
          setFilteredUsers((prev) =>
            prev.map((user) => (user.id === selectedUser.id ? data : user))
          );
          handleCloseEdit();
          setSnackbarMessage("User updated successfully");
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          setSnackbarMessage("Error updating user");
          setOpenSnackbar(true);
        });
    }
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          setFilteredUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== id)
          );
          setSnackbarMessage("User deleted successfully");
          setOpenSnackbar(true);
        } else {
          setSnackbarMessage('Error deleteing user')
          alert("Failed to delete user.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setSnackbarMessage('Error deleting user')
        alert("An error occurred while deleting the user.");
      });
  };

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 3, backgroundColor: "#f4ce8d", padding: "20px 20px" }}
      >
        <h2>User Management</h2>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          sx={{ width: "7rem" }}
        >
          Add User
        </Button>
        <Stack direction="row" spacing={2} style={{margin:'7px'}}>
          <TextField
            label="Search Users"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{backgroundColor: '#ebf1f1'}}
          />
        </Stack>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#07c9ea",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#07c9ea",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#07c9ea",
                }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#07c9ea",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#07c9ea",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "#dee3e3" }}>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar
                      sx={{
                        width: 18,
                        height: 18,
                        fontSize: 12,
                        backgroundColor: "#4764cc",
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box component="span" sx={{ ml: 1 }}>
                      {user.name}
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          user.status === "Active" ? "green" : "red",
                      }}
                    />
                    <Box component="span" sx={{ ml: 1 }}>
                      {user.status}
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteUser(user.id)}
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

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h3>Add New User</h3>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <InputLabel id="role-label" required>
              Role
            </InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              required
              fullWidth
            >
              {roles.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="status-label" required>
              Status
            </InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>

            <Button variant="contained" color="primary" onClick={handleAddUser}>
              Add User
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
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
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h3>Update User</h3>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <InputLabel id="role-label" required>
              Role
            </InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              required
              fullWidth
            >
              {roles.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="status-label" required>
              Status
            </InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateUser}
            >
              Update User
            </Button>
            <Button
              onClick={handleCloseEdit}
              variant="contained"
              color="secondary"
            >
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

export default UserManagement;