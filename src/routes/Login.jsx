import React, { useEffect, useState } from 'react';
import { Input, Heading, } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

import './css/Login.css'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username !== 'useradmin' || password !== 'stanleyispogi') {
      setError(
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Invalid Credentials!</AlertTitle>
          <AlertDescription>Please Check Your Username or Password</AlertDescription>
        </Alert>
      );
    } else {
      localStorage.setItem('loggedIn', 'true');
      console.log('Login successful');
    }
  };


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
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
