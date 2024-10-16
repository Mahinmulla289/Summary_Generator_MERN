import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();  // Hook to navigate between routes
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("isLoggedIn", true); // Set login status in localStorage
        navigate('/');  // Redirect to home page upon successful signup
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Signup failed');  // Show error if signup fails
      }
  
    } catch (error) {
      alert('An error occurred: ' + error.message);  // Catch network or other errors
    }
  };
  
  return (
    <div className='form'>
      <div className="form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" onChange={handleChange} required />
          </div>
          <button type="submit" id='submit'>Sign Up</button>
        </form>
        <div className="form-footer">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
