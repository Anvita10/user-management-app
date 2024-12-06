import React, { useState } from 'react';
import { login } from '../../utils/api'; // Adjust the relative path
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const response = await login(email, password);
      console.log("Response:", response);
      localStorage.setItem('token', response.data.token);
      onLoginSuccess();
    } catch (err) {
      console.error("Error:", err);
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(to right,#381360, #3261b0)', // Vibrant gradient background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '400px',
          padding: '30px',
          boxShadow: 4,
          borderRadius: 3,
          bgcolor: 'rgba(255, 255, 255, 0.9)', // Bright semi-transparent white
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" color="#272fb0">
          Welcome Back!
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          sx={{
            '& label.Mui-focused': { color: '#2575fc' }, // Custom focus color
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: '#6a11cb' }, // Hover effect
              '&.Mui-focused fieldset': { borderColor: '#2575fc' }, // Focus border color
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          sx={{
            '& label.Mui-focused': { color: '#6a11cb' },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: '#2575fc' },
              '&.Mui-focused fieldset': { borderColor: '#6a11cb' },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            bgcolor: '#2575fc', // Button background color
            '&:hover': { bgcolor: '#6a11cb' }, // Hover effect
            fontWeight: 'bold',
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;


