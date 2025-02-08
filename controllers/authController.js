// src/components/Authentication/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import hotelImage from '../Assets/Hotel_Background.jpg';  // Your image path

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (username === '' || password === '') {
      setError('Please enter both username and password.');
      return;
    }

    try {
      // API call to login
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      // Check if the response is successful
      if (response.status === 200) {
        const { token, user } = response.data;
        
        // Save the JWT token and user details to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to dashboard
        navigate('/admin-dashboard');
      }
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${hotelImage})` }}>
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Right Side - Form */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-black bg-opacity-50 shadow-xl backdrop-blur-sm rounded-xl border-4 border-gray-700">
          <h2 className="text-3xl font-semibold text-center mb-6 text-white">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring focus:ring-blue-400 bg-gray-700 text-white"
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring focus:ring-blue-400 bg-gray-700 text-white"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
