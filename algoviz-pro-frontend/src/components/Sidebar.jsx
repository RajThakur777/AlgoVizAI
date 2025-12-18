import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GlassCard from './GlassCard.jsx';
import { sidebarMenu } from '../config/sidebarConfig';
import { useAuth } from '../context/AuthContext.jsx';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [openCategory, setOpenCategory] = useState(null);

    // Auto-expand category based on active path
    useEffect(() => {
        const activeCategory = sidebarMenu.find(cat => 
            cat.subMenu.some(sub => sub.path === location.pathname)
        );
        if (activeCategory) setOpenCategory(activeCategory.title);
    }, [location.pathname]);

    return (
        /* FIXED: Changed 'sticky' to 'fixed' and added 'left-0' to keep it static */
        <GlassCard className="fixed top-0 left-0 w-72 p-0 flex flex-col h-screen rounded-none border-y-0 border-l-0 bg-slate-900/95 shadow-2xl z-50">
            <div className="p-8 border-b border-white/10 cursor-pointer" onClick={() => navigate('/algorithms')}>
                <h3 className="text-3xl font-black text-indigo-400 tracking-tighter hover:text-indigo-300 transition-colors">
                    AlgoViz<span className="text-white">Pro</span>
                </h3>
            </div>
            
            <nav className="flex-1 pt-4 overflow-y-auto custom-scrollbar">
                {sidebarMenu.map((item) => (
                    <div key={item.title}>
                        <button onClick={() => setOpenCategory(openCategory === item.title ? null : item.title)}
                            className={`w-full flex items-center justify-between px-6 py-4 transition-all ${openCategory === item.title ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-400 hover:text-white'}`}>
                            <div className="flex items-center gap-4">
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-bold text-xs uppercase tracking-widest">{item.title}</span>
                            </div>
                            <span className={`transition-transform duration-300 ${openCategory === item.title ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openCategory === item.title ? '400px' : '0' }}>
                            {item.subMenu.map((sub) => {
                                const isActive = location.pathname === sub.path;
                                return (
                                    <Link key={sub.path} to={sub.path} className={`block py-3 pl-16 pr-4 text-sm transition-all border-l-4 ${isActive ? 'text-white bg-indigo-600 font-bold border-indigo-400' : 'text-gray-500 border-transparent hover:text-gray-300'}`}>
                                        {sub.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-6 border-t border-white/10 bg-slate-900 mt-auto shrink-0">
                <button onClick={() => { logout(); navigate('/'); }} className="w-full py-4 rounded-xl border border-red-500/20 text-red-500/60 hover:bg-red-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest shadow-lg">
                    Sign Out
                </button>
            </div>
        </GlassCard>
    );
};

export default Sidebar;