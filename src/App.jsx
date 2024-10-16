// Name : Mahin A Mulla
// Enrollment no : 23002171220009
// Roll no : 146
// Batch : B5
// Branch : CSE
// Subject : FSD-II
// Date : 23/09/2024
// Title : Article Summary



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Summ from './components/Summ';
import Demo from './components/Demo';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';
import './Styles.css';

const App = () => {
  return (
    <Router>
      <div className='main'>
        {/* <div className='gradient'>
          <Summ />
          <Demo />
        </div> */}
      </div>
      <main>
        <div className='app'>
          <Routes>
            <Route path="/" element={
              <div>
                <Summ />
                <Demo />
              </div>
            } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;
