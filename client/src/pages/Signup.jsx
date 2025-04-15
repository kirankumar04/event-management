import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import signupGif from '../assets/signup.gif'; // Make sure to use the correct path

function Signup() {
  const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) return handleError('All fields are required');

    try {
      const url = 'http://localhost:5000/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
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
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Signup</h2>
        <div className="w-full flex justify-center mb-6">
          <img src={signupGif} alt="Signup" className="w-40 h-40 object-cover" />
        </div>
        <form onSubmit={handleSignup} className="space-y-4 w-full">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={signupInfo.name}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={signupInfo.email}
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
              value={signupInfo.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Signup
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
