// src/components/AlgorithmCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AlgorithmCard = ({ name, path, description }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(path)}
            className="glass-panel glass-card-hover group relative overflow-hidden rounded-2xl p-6 cursor-pointer h-full flex flex-col"
        >
            {/* Decorative Background Glow */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/15 transition-colors rounded-full" />

            {/* Icon & Category Tag */}
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-all duration-300">
                    <span className="text-2xl group-hover:scale-110 block transition-transform">💻</span>
                </div>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] bg-white/5 px-2 py-1 rounded">
                    Module
                </span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-black text-white mb-3 group-hover:text-indigo-300 transition-colors tracking-tight">
                {name}
            </h3>
            
            <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                {description || "Explore the step-by-step logic, temporal complexity, and AI-powered insights for this algorithm."}
            </p>

            {/* CTA Button Component within Card */}
            <div className="relative mt-auto">
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    <span className="text-[10px] font-black uppercase tracking-widest">Start Session</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmCard;