import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import LoginForm from '../components/Authentication/LoginForm';
import { Box } from '@mui/material';

const LoginPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    const token = localStorage.getItem('token');
    console.log("Token found:", token);
    setToken(token);  // Set token state to trigger re-render
  };

  // If token is set, automatically redirect to users page
  if (token) {
    return <Navigate to="/users" />;
  }

  return (
    <>
      <Box sx={{bgcolor:''}}> 
      <LoginForm onLoginSuccess={handleLoginSuccess} />;
      </Box>
    </>
  )
};

export default LoginPage;

