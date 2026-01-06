import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard.jsx';

const LandingPage = () => {
    // Animation variants for re-usability
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="bg-[#020617] text-white overflow-hidden relative min-h-screen">
            
            {/* --- HOMEPAGE EXCLUSIVE STAR FIELD EFFECT --- */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                .star-field {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }
                .star {
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    opacity: 0.5;
                    animation: twinkle var(--duration) infinite ease-in-out;
                }
            `}} />

            <div className="star-field">
                {/* Generating dynamic stars */}
                {[...Array(50)].map((_, i) => (
                    <div 
                        key={i} 
                        className="star" 
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3}px`,
                            height: `${Math.random() * 3}px`,
                            '--duration': `${2 + Math.random() * 4}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>
            {/* --- END STAR FIELD --- */}

            {/* BACKGROUND NEBULA GLOWS */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/15 blur-[120px] rounded-full" />
            </div>

            {/* HERO SECTION */}
            <section className="min-h-screen flex items-center justify-center p-8 relative z-10">
                <div className="max-w-5xl text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "backOut" }}
                    >
                        <h1 className="text-7xl md:text-9xl font-black leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-teal-300 to-emerald-400" style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))' }}>
                            Visualize<br/>Algorithm Flow
                        </h1>
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-2xl text-gray-400 italic font-light max-w-2xl mx-auto"
                    >
                        "Stop guessing how your code works. Watch it happen in real-time with AI-powered pedagogical feedback."
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="pt-6 flex flex-col md:flex-row gap-6 justify-center"
                    >
                        <Link to="/login" className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white text-xl font-black py-5 px-14 rounded-full transition transform hover:scale-110 hover:shadow-[0_0_40px_rgba(79,70,229,0.6)]">
                            Launch Visualizer →
                        </Link>
                        <a href="#features" className="backdrop-blur-md bg-white/5 border border-white/10 py-5 px-14 rounded-full text-xl font-bold hover:bg-white/10 transition">
                            Explore Features
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES LISTING SECTION */}
            <motion.section 
                id="features"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-40 px-8 max-w-7xl mx-auto relative z-10"
            >
                <div className="text-center mb-32">
                    <motion.h2 variants={fadeInUp} className="text-6xl font-black tracking-tighter mb-6">
                        Engineered for Learners
                    </motion.h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "128px" }}
                        className="h-2 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto rounded-full" 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        { icon: "📈", title: "Step-by-Step", desc: "Pause, rewind, and fast-forward through every iteration visually." },
                        { icon: "🤖", title: "AI Tutor", desc: "Real-time natural language explanations from our Gemini engine." },
                        { icon: "💻", title: "Live Highlighting", desc: "Watch code execution in perfect sync with animation bars." },
                        { icon: "🔗", title: "Data Structures", desc: "Visualize pointers and nodes for dynamic linked structures." },
                        { icon: "📊", title: "Diverse Library", desc: "From Sorting and Searching to advanced Graphs and Trees." },
                        { icon: "⚡", title: "Dynamic Controls", desc: "Adjust speed and test custom arrays to explore edge cases." },
                    ].map((feature, idx) => (
                        <FeatureCard 
                            key={idx}
                            variants={fadeInUp}
                            icon={feature.icon} 
                            title={feature.title} 
                            desc={feature.desc} 
                        />
                    ))}
                </div>
            </motion.section>

            {/* CTA SECTION */}
            <section className="py-40 px-8 mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <GlassCard className="max-w-5xl mx-auto !bg-indigo-600/5 border-indigo-500/30 p-20 text-center space-y-8 relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/10 blur-[100px] rounded-full" />
                        <h3 className="text-5xl font-black text-white">Ready to Master DSA?</h3>
                        <p className="text-gray-400 text-xl max-w-xl mx-auto font-medium">Join students using AlgoViz Pro to ace technical interviews.</p>
                        <Link to="/signup" className="inline-block bg-white text-indigo-950 font-black py-5 px-14 rounded-2xl hover:bg-indigo-50 transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] text-lg uppercase tracking-widest">
                            Create Free Account
                        </Link>
                    </GlassCard>
                </motion.div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, variants }) => (
    <motion.div variants={variants}>
        <GlassCard className="!bg-slate-900/40 border-white/5 hover:border-indigo-500/50 hover:-translate-y-4 transition-all duration-500 group p-12 h-full text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-500 rounded-[inherit]" />
            <div className="text-7xl mb-10 group-hover:scale-125 transition-transform duration-500 block">{icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-indigo-300 group-hover:text-teal-300 transition-colors relative z-10">{title}</h3>
            <p className="text-gray-400 font-medium leading-relaxed relative z-10">{desc}</p>
        </GlassCard>
    </motion.div>
);

export default LandingPage;