import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import loginGif from '../assets/login.gif'; // Make sure to use the correct path

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) return handleError('Email and password are required');

    try {
      const url = 'http://localhost:5000/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { id, success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('userid', id);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('email', email);
        localStorage.setItem('bookmarks', JSON.stringify([]));
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        console.log(bookmarks)
        localStorage.setItem('registeredEvents', JSON.stringify([]));
        setTimeout(() => navigate('/'), 1000);
      } else {
        const errorMsg = error?.details?.[0]?.message || message;
        handleError(errorMsg);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <div className="w-full flex justify-center mb-6">
          <img src={loginGif} alt="Login" className="w-40 h-40 object-cover" />
        </div>
        <form onSubmit={handleLogin} className="space-y-4 w-full">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={loginInfo.email}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={loginInfo.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
