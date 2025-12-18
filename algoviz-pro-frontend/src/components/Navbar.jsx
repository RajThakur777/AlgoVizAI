import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = ({ isDashboard }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // Dashboards usually hide the top nav to save vertical space
    if (isDashboard) return null;

    return (
        <nav className="bg-[#111827]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 h-20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Link to="/" className="text-3xl font-black text-indigo-400 tracking-tighter">
                    AlgoViz<span className="text-teal-400">Pro</span>
                </Link>
                
                <div className="flex items-center gap-10 font-bold uppercase text-xs tracking-widest text-white">
                    {/* Link for Features section on LandingPage */}
                    <a href="#features" className="hover:text-indigo-400 transition cursor-pointer">Features</a>
                    
                    {!isAuthenticated ? (
                        <div className="flex items-center gap-6">
                            {/* ADDED LOGIN AND SIGNUP BUTTONS */}
                            <Link to="/login" className="hover:text-indigo-400 transition">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20 text-center">
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <Link to="/algorithms" className="bg-teal-500 px-8 py-3 rounded-full hover:bg-teal-600 transition shadow-lg text-center">
                            Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;