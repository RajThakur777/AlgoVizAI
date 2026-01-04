// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sidebarMenu } from '../config/sidebarConfig';
import { useAuth } from '../context/AuthContext.jsx';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [openCategory, setOpenCategory] = useState(null);

    // This effect ensures the correct category stays open based on the URL
    useEffect(() => {
        const activeCategory = sidebarMenu.find(cat => 
            cat.subMenu.some(sub => sub.path === location.pathname)
        );
        if (activeCategory) setOpenCategory(activeCategory.title);
    }, [location.pathname]);

    return (
        <aside className="fixed top-0 left-0 w-72 h-screen z-50 glass-panel border-r border-white/5 bg-slate-950/40 flex flex-col rounded-none shadow-2xl">
            {/* Branding */}
            <div className="p-8 border-b border-white/5 cursor-pointer group" onClick={() => navigate('/algorithms')}>
                <h3 className="text-3xl font-black text-indigo-400 tracking-tighter group-hover:text-glow-indigo transition-all">
                    AlgoViz<span className="text-white">Pro</span>
                </h3>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 pt-6 overflow-y-auto custom-scrollbar space-y-2">
                {sidebarMenu.map((item) => (
                    <div key={item.title} className="px-4">
                        <button 
                            onClick={() => setOpenCategory(openCategory === item.title ? null : item.title)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                                openCategory === item.title ? 'bg-indigo-500/10 text-indigo-300' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-black text-[10px] uppercase tracking-widest">{item.title}</span>
                            </div>
                            <span className={`text-[10px] transition-transform duration-300 ${openCategory === item.title ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        <AnimatePresence>
                            {openCategory === item.title && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="py-2 space-y-1">
                                        {item.subMenu.map((sub) => {
                                            // STRICT MATCHING: Prevents Tree BFS from highlighting when Graph BFS is active
                                            const isActive = location.pathname === sub.path;
                                            return (
                                                <Link 
                                                    key={sub.path} 
                                                    to={sub.path} 
                                                    className={`block py-3 pl-12 pr-4 text-[11px] font-bold uppercase tracking-wider transition-all rounded-lg ${
                                                        isActive 
                                                        ? 'text-white bg-indigo-600/40 shadow-lg shadow-indigo-500/10 border-r-4 border-indigo-400' 
                                                        : 'text-gray-600 hover:text-gray-400 hover:pl-14'
                                                    }`}
                                                >
                                                    {sub.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </nav>

            {/* Session Termination */}
            <div className="p-6 border-t border-white/5">
                <button 
                    onClick={() => { logout(); navigate('/'); }} 
                    className="w-full py-4 rounded-xl border border-red-500/10 text-red-500/40 hover:bg-red-500 hover:text-white hover:border-transparent transition-all font-black text-[10px] uppercase tracking-[0.2em]"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;