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

    useEffect(() => {
        const activeCategory = sidebarMenu.find(cat => 
            cat.subMenu.some(sub => sub.path === location.pathname)
        );
        if (activeCategory) setOpenCategory(activeCategory.title);
    }, [location.pathname]);

    return (
        <aside className="fixed top-0 left-0 w-72 h-screen z-50 glass-panel border-r border-white/5 bg-slate-950/40 flex flex-col rounded-none shadow-2xl">
            {/* Branding with Indigo Icon */}
            <div className="p-8 border-b border-white/5 cursor-pointer group flex items-center gap-3" onClick={() => navigate('/algorithms')}>
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                    <span className="text-white font-black text-xs">AV</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-glow-indigo transition-all">
                    AlgoViz<span className="text-indigo-400">Pro</span>
                </h3>
            </div>
            
            <nav className="flex-1 pt-6 overflow-y-auto custom-scrollbar space-y-2">
                {sidebarMenu.map((item) => (
                    <div key={item.title} className="px-4">
                        <button 
                            onClick={() => setOpenCategory(openCategory === item.title ? null : item.title)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${
                                openCategory === item.title ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`text-xl transition-colors ${openCategory === item.title ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-300'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{item.title}</span>
                            </div>
                            <span className={`text-[10px] transition-transform duration-300 ${openCategory === item.title ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        <AnimatePresence>
                            {openCategory === item.title && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                    <div className="py-2 space-y-1">
                                        {item.subMenu.map((sub) => (
                                            <Link 
                                                key={sub.path} to={sub.path} 
                                                className={`block py-3 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${
                                                    location.pathname === sub.path 
                                                    ? 'text-white bg-indigo-600/40 shadow-lg border-r-4 border-indigo-400' 
                                                    : 'text-slate-500 hover:text-indigo-200 hover:bg-white/5 hover:pl-14'
                                                }`}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </nav>

            <div className="p-6 border-t border-white/5">
                <button 
                    onClick={() => { logout(); navigate('/'); }} 
                    className="w-full py-4 rounded-xl border border-red-500/20 text-red-500/60 hover:bg-red-500 hover:text-white transition-all font-black text-[9px] uppercase tracking-[0.3em]"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};
export default Sidebar;