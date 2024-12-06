import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import UserList from '../components/UserList/UserList';

const UserListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login...');
      navigate('/login'); // Redirect to login if token is missing
    }

    // Optional: Simulate token expiry (e.g., after 1 hour)
    const timeout = setTimeout(() => {
      localStorage.removeItem('token');
      console.log('Token expired, redirecting to login...');
      navigate('/login');
    }, 3600000); // 1 hour in milliseconds

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/login'); // Redirect to login
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        Logout
      </Button>
      <UserList />
    </div>
  );
};

export default UserListPage;


