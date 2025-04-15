import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;

    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (token && loggedInUser) {
            setUser(loggedInUser);
        } else {
            setUser(null);
        }
    }, [location]);

    const handleLogout = () => {
        //remove all user-related data from localStorage
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center gap-3">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="JByte Logo" />
                    <span className="text-white text-2xl font-semibold">JByte</span>
                </a>

                <div className="flex w-auto flex-row gap-4">
                    <Link to="/" className={`block py-2 px-3 rounded-full hover:bg-gray-700 ${isActive('/') ? 'bg-gray-800 text-white' : 'text-white'}`}>Home</Link>
                    <Link to="/events" className={`block py-2 px-3 rounded-full hover:bg-gray-700 ${isActive('/events') ? 'bg-gray-800 text-white' : 'text-white'}`}>Events</Link>
                    <Link to="/about" className={`block py-2 px-3 rounded-full hover:bg-gray-700 ${isActive('/about') ? 'bg-gray-800 text-white' : 'text-white'}`}>About</Link>
                </div>

                <div className="flex flex-row gap-4 relative">
                    {user ? (
                        <div className="relative">
                            <button
                                className="text-white text-xl focus:outline-none"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <FaUserCircle className='cursor-pointer'/>
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                                    <button
                                        className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 cursor-pointer"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                            <button
                                className="text-blue-700 bg-gray-900 border hover:border-gray-500 font-medium rounded-full text-sm px-5 py-2.5 cursor-pointer"
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
