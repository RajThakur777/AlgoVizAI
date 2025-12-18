import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard.jsx';

const LandingPage = () => {
    return (
        <div className="bg-[#0f172a] text-white">
            {/* HERO SECTION */}
            <section className="min-h-[90vh] flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-5xl text-center space-y-10 animate-fadeIn relative z-10">
                    <h1 className="text-8xl font-black leading-[1.1] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-teal-300 to-emerald-400">
                        Visualize<br/>Algorithm Flow
                    </h1>
                    <p className="text-2xl text-gray-400 italic font-light max-w-2xl mx-auto">
                        "Stop guessing how your code works. Watch it happen in real-time with AI-powered pedagogical feedback."
                    </p>
                    <div className="pt-10">
                        <Link to="/login" className="bg-gradient-to-r from-green-500 to-teal-400 text-white text-2xl font-black py-6 px-16 rounded-full transition transform hover:scale-110 shadow-2xl">
                            Launch Visualizer →
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES LISTING SECTION */}
            <section id="features" className="py-40 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-24 space-y-6">
                    <h2 className="text-6xl font-black tracking-tighter">Engineered for Learners</h2>
                    <div className="w-32 h-2 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <FeatureCard 
                        icon="📈" 
                        title="Step-by-Step Traversal" 
                        desc="Pause, rewind, and fast-forward through every iteration to understand temporal complexity visually." 
                    />
                    <FeatureCard 
                        icon="🤖" 
                        title="AI Tutor Integration" 
                        desc="Get real-time natural language explanations for current data states from our Gemini-powered engine." 
                    />
                    <FeatureCard 
                        icon="💻" 
                        title="Live Code Highlight" 
                        desc="Watch exactly which line of code is executing in perfect sync with the animation bars." 
                    />
                    <FeatureCard 
                        icon="🔗" 
                        title="Linked List Visualizer" 
                        desc="Visualize pointer assignments and node creation in real-time for dynamic data structures." 
                    />
                    <FeatureCard 
                        icon="📊" 
                        title="Diverse Algorithms" 
                        desc="Coverage from basic Sorting and Searching to advanced Tree Traversals and Graphs." 
                    />
                    <FeatureCard 
                        icon="⚡" 
                        title="Dynamic Controls" 
                        desc="Adjust simulation speed and load custom input arrays to test edge cases immediately." 
                    />
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 px-8 mb-20">
                <GlassCard className="max-w-5xl mx-auto !bg-indigo-600/10 border-indigo-500/30 p-20 text-center space-y-8">
                    <h3 className="text-5xl font-black text-white">Ready to Master DSA?</h3>
                    <p className="text-gray-400 text-xl max-w-xl mx-auto">Join hundreds of students using AlgoViz Pro to ace their technical interviews.</p>
                    <Link to="/signup" className="inline-block bg-white text-indigo-950 font-black py-4 px-12 rounded-xl hover:bg-indigo-50 transition-colors text-lg uppercase tracking-widest">
                        Create Free Account
                    </Link>
                </GlassCard>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <GlassCard className="!bg-slate-900/40 border-indigo-500/10 hover:border-indigo-500/50 hover:-translate-y-4 transition-all duration-500 group p-12 h-full text-center">
        <div className="text-6xl mb-10 group-hover:scale-110 transition-transform duration-500">{icon}</div>
        <h3 className="text-2xl font-bold mb-4 text-indigo-300 group-hover:text-teal-300 transition-colors">{title}</h3>
        <p className="text-gray-400 font-medium leading-relaxed">{desc}</p>
    </GlassCard>
);

export default LandingPage;