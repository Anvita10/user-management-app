import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fade } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, [page]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${selectedUser.id}`, {
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        email: selectedUser.email,
      });
      const updatedUser = response.data;
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...updatedUser } : user)));
      setEditDialogOpen(false);
      showSnackbar('User updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      showSnackbar('Failed to update user.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      showSnackbar('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      showSnackbar('Failed to delete user.');
    }
  };

  const showSnackbar = (msg) => {
    setSnackbarMessage(msg);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right,#46325b, #134fb3)', // Vibrant gradient
        padding: '20px',
      }}
    >
      <Typography variant="h4" textAlign="center" margin="20px" color="white" fontWeight="bold">
        User List
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: '1200px', marginBottom: '20px' }}
      >
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{
                maxWidth: 345,
                '&:hover': { boxShadow: 6 },
                backgroundColor: '#ffffffdd', // Slightly transparent white
              }}
            >
              <CardMedia component="img" height="180" image={user.avatar} alt={user.first_name} />
              <CardContent>
                <Typography variant="h6" component="div">
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  paddingBottom: '10px',
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(user)}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(user.id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} TransitionComponent={Fade}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={selectedUser?.first_name || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={selectedUser?.last_name || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={selectedUser?.email || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          sx={{ marginRight: '10px' }}
        >
          Previous
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UserList;
