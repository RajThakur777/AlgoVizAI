// AITutorPanel.jsx

import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard.jsx'; 
import { getTutorResponse } from '../services/aiService'; // Import new service

// FIX CONFIRMED: Using named import { ALGO_CODE_DATABASE }
import { ALGO_CODE_DATABASE } from './CodePanel'; 

const AITutorPanel = ({ currentVisualizationState, algoSlug }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Dynamic suggestions based on the project objectives
    const suggestions = [
        { label: "❓ Explain this step", prompt: "Can you explain what is happening in the current step of this algorithm?" },
        { label: "⏳ Time Complexity", prompt: "What is the time and space complexity of this specific operation?" },
        { label: "💡 Give me a hint", prompt: "Without giving it away, what logic will the algorithm execute next?" },
        { label: "💻 Code Translation", prompt: "How would this specific logic look in Python or C++?" }
    ];

    const handleSendMessage = async (textOverride) => {
        const messageText = textOverride || input;
        if (!messageText.trim() || isTyping) return;

        const newUserMessage = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsTyping(true);

        // --- 1. Prepare Context Data ---
        const codeLines = ALGO_CODE_DATABASE[algoSlug] || [];
        const codeSnippets = codeLines.map(line => `${line.number}: ${line.text}`);
        
        const payload = {
            userPrompt: messageText,
            algoSlug: algoSlug,
            currentVizState: currentVisualizationState,
            codeSnippets: codeSnippets,
        };

        // --- 2. Call Backend API ---
        try {
            const aiText = await getTutorResponse(payload);
            
            const aiResponse = {
                sender: 'ai',
                text: aiText
            };
            setMessages(prev => [...prev, aiResponse]);
            
        } catch (error) {
            console.error("AI Tutor Error:", error);
            const errorResponse = {
                sender: 'ai',
                text: "Sorry, I couldn't connect to the AI service. Please check the backend server logs for the Gemini API error."
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <GlassCard className="flex flex-col h-full min-h-[300px] border border-indigo-500/20 shadow-2xl"> 
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2">
                    <span>🤖</span> AI Pedagogical Tutor
                </h2>
                {currentVisualizationState && (
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full font-bold animate-pulse">
                        Monitoring Step {currentVisualizationState.step}
                    </span>
                )}
            </div>
            
            {/* Chat History Section */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 custom-scrollbar bg-black/5">
                {messages.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-sm italic mb-4">
                            Select a suggestion below to begin your context-aware learning session.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {suggestions.map((s, i) => (
                                <button key={i} onClick={() => handleSendMessage(s.prompt)}
                                    className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all">
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl shadow-xl text-xs leading-relaxed ${
                                msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-gray-200 rounded-tl-none border border-white/5'
                            }`}>
                                <p className="font-black uppercase tracking-tighter opacity-50 mb-1 text-[9px]">
                                    {msg.sender === 'user' ? 'Student' : 'Gemini Tutor'}
                                </p>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))
                )}
                {isTyping && <div className="text-indigo-400 text-[10px] font-bold animate-pulse">Tutor is analyzing code logic...</div>}
            </div>

            {/* Input Section */}
            <div className="p-4 bg-black/20 border-t border-white/10">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask about complexity or logic..."
                        className="flex-1 p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white outline-none focus:border-indigo-500 transition-colors"
                    />
                    <button onClick={() => handleSendMessage()}
                        className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition shadow-lg active:scale-95">
                        Ask
                    </button>
                </div>
            </div>
        </GlassCard>
    );
};

export default AITutorPanel;