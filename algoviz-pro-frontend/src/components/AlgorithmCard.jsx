// src/components/AlgorithmCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlgorithmCard = ({ name, path, description }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(path)}
            className="glass-panel relative overflow-hidden rounded-[2.5rem] p-10 cursor-pointer h-full flex flex-col transition-all duration-500 group active:scale-95"
            style={{ 
                border: '1px solid rgba(255, 255, 255, 0.05)',
                // Base shadow
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
            }}
        >
            {/* Animated Glow Overlay on Hover/Click */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-teal-500/0 group-hover:from-indigo-600/10 group-hover:to-teal-500/10 transition-all duration-500" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/5 blur-[80px] group-hover:bg-indigo-500/20 group-hover:blur-[100px] transition-all duration-700 rounded-full" />
            
            {/* Card Content */}
            <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-10">
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-indigo-500/5">
                        <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-500">
                            {name.toLowerCase().includes('sort') ? '📊' : 
                             name.toLowerCase().includes('search') ? '🔍' : 
                             name.toLowerCase().includes('graph') ? '🕸️' : '🧠'}
                        </span>
                    </div>
                </div>

                <h3 className="text-3xl font-black text-white mb-4 tracking-tighter group-hover:text-glow-indigo transition-all">
                    {name}
                </h3>
                <p className="text-gray-400 font-medium leading-relaxed mb-12 flex-1">
                    {description}
                </p>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-indigo-500/20 transition-colors">
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 group-hover:text-white transition-all">
                        Initialize Engine
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300">
                        <span className="text-white text-lg font-bold">→</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmCard;