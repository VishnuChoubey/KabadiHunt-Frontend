import React, { useState } from 'react';
import axios from 'axios';

const AuthTest = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const handleAuthTest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/authenticate", {
        username,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true // important if backend uses cookies / credentials
      });

      if (response.status === 200) {
        setResult(`✅ Token: ${response.data.accessToken}`);
      } else {
        setResult(`❌ Status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        setResult(`❌ Error ${error.response.status}: ${error.response.data.message || error.response.data}`);
      } else {
        setResult(`❌ Request failed: ${error.message}`);
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Auth Test</h2>
      <form onSubmit={handleAuthTest}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br />
        <button type="submit">Test Authenticate</button>
      </form>
      <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{result}</div>
    </div>
  );
};

export default AuthTest;
