// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
    <footer className="bg-slate-950 border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div>
                <h3 className="text-3xl font-black text-indigo-400 mb-2 tracking-tighter">AlgoViz Pro</h3>
                <p className="text-gray-500 max-w-sm font-medium">Master Data Structures and Algorithms with high-fidelity interactive visualizations and AI tutoring.</p>
            </div>
            
            <div className="flex flex-col gap-4">
                <div className="text-gray-300 text-sm font-bold uppercase tracking-widest">
                    © {new Date().getFullYear()} AlgoViz Pro. All rights reserved.
                </div>
                <div className="flex justify-center md:justify-end gap-10 text-xs uppercase tracking-widest font-black text-gray-500">
                    <a href="#" className="hover:text-teal-400 transition">Privacy</a>
                    <a href="#" className="hover:text-teal-400 transition">Terms</a>
                    <a href="#" className="hover:text-teal-400 transition">Contact</a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;