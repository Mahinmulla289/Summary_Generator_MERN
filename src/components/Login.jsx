import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle error messages
  const [loading, setLoading] = useState(false); // State to handle loading status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Check if the response is ok
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("email", data.email); // Ensure 'data.email' contains the correct email
        localStorage.setItem("isLoggedIn", true);
        navigate('/'); // Redirect to home page
      } else {
        const errorData = await response.json(); // Parse error response
        setError(errorData.error || 'Login failed'); // Set error message
      }
    } catch (err) {
      setError('An unexpected error occurred'); // Handle unexpected errors
    } finally {
      setLoading(false); // Reset loading status
    }
  };
  

  return (
    <div className="form">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" id="submit" disabled={loading}>Login</button>
        </form>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        <div className="form-footer">
          <p>
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
