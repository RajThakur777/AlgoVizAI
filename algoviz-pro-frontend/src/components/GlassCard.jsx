import React from 'react';
const GlassCard = ({ children, className = '' }) => (
    <div className={`bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl p-6 transition duration-300 text-white ${className}`}>
        {children}
    </div>
);
export default GlassCard;