import React from 'react'
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed
import { useState } from 'react';
import logoImg from './logo.png'
import SignUp from './SignUp';
import Dashboard from './Dashboard';
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
    };



  return (
    <div>
         <nav className="bg-gradient-to-r from-gray-200 to-indigo-300 text-gray-800 p-4 border rounded-lg shadow-lg shadow-indigo-400/40">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold">
                    <img src= {logoImg} alt="Farm Helper Logo" className="h-18 w-28 opacity-100" />
                </Link>
                <div className="flex gap-4">
                <Link to="/Dashboard" className="hover:bg-gradient-to-r from-green-300 to-yellow-300 p-2 rounded">
                        Dashboard
                    </Link>
                    <Link to="/crops" className="hover:bg-gradient-to-r from-green-300 to-yellow-300 p-2 rounded">
                        Recommend crops
                    </Link>
                    <Link to="/Maps" className="hover:bg-gradient-to-r from-green-300 to-yellow-300 p-2 rounded">
                        Nearby laboratories
                    </Link>
                    {/* {isLoggedIn ? (
                        <button onClick={handleLoginLogout} className="bg-red-600 hover:bg-red-700 p-2 rounded">
                            Logout
                        </button>
                    ) : (
                        <button>
                        <Link to="/" className="hover:bg-green-600 p-2 rounded">
                            Login
                        </Link>
                        </button>
                    )} */}
                    <Link to="/Disease" className="hover:bg-gradient-to-r from-green-300 to-yellow-300 p-2 rounded">
                        Plant Disease
                    </Link>
                    <Link to="/Signup" className="hover:bg-gradient-to-r from-green-300 to-yellow-300 p-2 rounded">
                        SignUp
                    </Link>
                </div>
            </div>
        </nav>
    </div>
  );
};

export default Navbar