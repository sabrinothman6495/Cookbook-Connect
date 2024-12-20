import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { TextInput, Button, Alert } from '@mantine/core';
import { auth } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    setErrorMessage(null); // Reset previous error message

    try {
      const response = await fetch('http://localhost:3002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response Status:', response.status);

      const data = await response.json();
      console.log('Response Data:', data);

      if (response.ok) {
        auth.setToken(data.token); // to set the token
        setUser(data.user); // to set user context
        setUsername(''); // to reset username field
        setPassword(''); // to reset password field
        navigate('/profile'); //  to redirect to profile page
      } else {
        // Set the error message to state to display it
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again later.'); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <TextInput
          label="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      {errorMessage && (
        <Alert title="Error" color="red" mt="md">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};

export default Login;
