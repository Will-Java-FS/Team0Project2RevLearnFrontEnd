import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './pages/Layout'; // Import Layout
import Dashboard from './pages/Dashboard';

const App = () => {
  const handleRegisterSuccess = () => {
    console.log('Registration successful!');
    window.location.href = "/login";
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/register"
            element={<Register onRegisterSuccess={handleRegisterSuccess} />}
          />
          <Route path="/login" element={<Login onLoginSuccess={handleRegisterSuccess} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;