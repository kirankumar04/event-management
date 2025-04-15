import React from 'react';
import {
  FaFacebookF,
  FaDiscord,
  FaTwitter,
  FaGithub,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="JByte Logo"
              />
              <span className="text-2xl font-semibold">JByte</span>
            </a>
          </div>

          <div className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/events" className="hover:text-blue-500">Events</Link>
            <Link to="/about" className="hover:text-blue-500">About</Link>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <span className="text-sm text-gray-400 text-center md:text-left">
            © 2025 <a href="" className="hover:underline">JByte™</a>. All rights reserved.
          </span>

          <div className="flex gap-4 justify-center md:justify-end">
            <a href="" className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-blue-800"><FaFacebookF /></a>
            <a href="" className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-blue-800"><FaDiscord /></a>
            <a href="" className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-blue-800"><FaTwitter /></a>
            <a href="" className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-blue-800"><FaGithub /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
