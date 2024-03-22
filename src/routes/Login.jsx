import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Input, Heading, Button, Alert, AlertIcon, AlertTitle, AlertDescription, } from '@chakra-ui/react'
import './css/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'useradmin' && password === 'stanleyispogi') {
      localStorage.setItem('loggedIn', 'true');
      console.log('Login successful');
      navigate('/Dashboard');
    } else {
      setError(
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Invalid Credentials!</AlertTitle>
          <AlertDescription>Please Check Your Username or Password</AlertDescription>
        </Alert>
      );
    };
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <div>
      <div className='login-page'>
        <div className="login-container">
          <Heading mb={4} color='#D69E2E'>ThunderBank Login</Heading>
          {error && <p className="error">{error}</p>}
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} // Added onKeyDown event listener
          />
          <Button colorScheme='teal' variant='ghost' onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
