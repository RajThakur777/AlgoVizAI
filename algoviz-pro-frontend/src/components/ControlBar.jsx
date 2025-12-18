import React, { useState, useRef, useEffect } from 'react';

const VizControls = ({ currentVizState, controls, onSpeedChange }) => {
    const [speedValue, setSpeedValue] = useState(500); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [userInput, setUserInput] = useState("");
    const intervalRef = useRef(null);
    
    // De-structure controls passed from VisualizerPage
    const { advanceStep, reset, initializeVisualization } = controls.current || {};

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        if (reset) reset();
    };

    // Real-time: Triggered when user submits a custom array
    const handleCustomInput = (e) => {
        e.preventDefault();
        const newArray = userInput.split(',')
            .map(num => parseInt(num.trim()))
            .filter(num => !isNaN(num));

        if (newArray.length > 0 && initializeVisualization) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            initializeVisualization(newArray); // Resets the Generator with new data
        }
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
        } else if (advanceStep) {
            setIsPlaying(true);
            intervalRef.current = setInterval(() => {
                if (!advanceStep()) {
                    clearInterval(intervalRef.current);
                    setIsPlaying(false);
                }
            }, 2100 - speedValue);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-slate-900/50 rounded-xl border border-white/10">
            {/* Playback Group */}
            <div className="flex items-center space-x-4">
                <button onClick={handlePlayPause} className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition shadow-lg ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}>
                    {isPlaying ? '⏸' : '▶'}
                </button>
                <button onClick={() => advanceStep && advanceStep()} disabled={isPlaying} className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-30 transition shadow-lg">➡️</button>
                <button onClick={handleReset} className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 transition shadow-lg">🔄</button>
            </div>

            {/* Real-time Input Group */}
            <form onSubmit={handleCustomInput} className="flex-1 max-w-md flex items-center gap-2">
                <input 
                    type="text" 
                    placeholder="E.g. 40, 10, 35, 20"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1 bg-slate-800 border border-white/10 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none transition"
                />
                <button type="submit" className="bg-indigo-600 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition">Set Data</button>
            </form>
            
            {/* Speed Control */}
            <div className="flex flex-col w-48">
                <label className="text-[10px] uppercase tracking-widest font-black text-indigo-400 mb-1">Animation Speed</label>
                <input type="range" min="100" max="2000" step="50" value={speedValue} onChange={(e) => {
                    const val = Number(e.target.value);
                    setSpeedValue(val);
                    onSpeedChange(val);
                    if (isPlaying) {
                        clearInterval(intervalRef.current);
                        setIsPlaying(false); // User restarts play manually to refresh interval
                    }
                }} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </div>
            
            <div className="border-l border-white/10 pl-8 h-10 hidden lg:flex items-center font-mono text-xs">
                <span className="text-white font-bold mr-2 uppercase">Status: {currentVizState?.action || 'READY'}</span>
                <span className="text-indigo-400 font-black ml-4">Step: {currentVizState?.step || 0}</span>
            </div>
        </div>
    );
};
export default VizControls;