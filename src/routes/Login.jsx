import React, { useState } from 'react';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username !== 'useradmin' || password !== 'stanleyispogi') {
      setError('Invalid username or password');
    } else {
      localStorage.setItem('loggedIn', 'true');
      console.log('Login successful');
    }
  };


  return (
    <div className="login-container">
      <h2>Login to Your Banking Account</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
