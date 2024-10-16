import React, { useState, useEffect } from 'react';
import { logo } from '../assets';
import { useNavigate } from 'react-router-dom';

const Summ = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  useEffect(() => {
    // Check login status from localStorage on component mount
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!loggedInStatus); // Convert to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    setIsLoggedIn(false); // Update login state
    navigate('/'); // Redirect to home or any other page after logout
  };

  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz_logo' className='logo' />

        {isLoggedIn ? (
          <button onClick={handleLogout} className='black_btn'>
            Logout
          </button>
        ) : (
          <button onClick={() => navigate('/login')} className='black_btn'>
            Login
          </button>
        )}
      </nav>

      <h1 className='head_text'>
        Summarize articles with <br className='max-md:hidden' />
        <span className='orange_gradient'>Summize</span>
      </h1>

      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer that transforms lengthy articles into clear and concise summaries.
      </h2>
    </header>
  );
};

export default Summ;
