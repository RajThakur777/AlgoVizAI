import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fixedSlidingWindow, variableSlidingWindow } from '../algorithms/slidingWindow';

const SlidingWindowVisualizer = ({ algoSlug, onStateChange, controls }) => {
    const [array, setArray] = useState([1, 4, 2, 10, 2, 3, 1, 0, 20]);
    const [constraint, setConstraint] = useState(3);
    const [state, setState] = useState({ 
        window: [-1, -1], currentSum: 0, best: 0, add: null, rem: null 
    });
    const generatorRef = useRef(null);
    const isFixed = algoSlug === 'sliding-window-fixed';

    const startSim = () => {
        generatorRef.current = isFixed 
            ? fixedSlidingWindow(array, constraint) 
            : variableSlidingWindow(array, constraint);
        advance();
    };

    const advance = () => {
        const next = generatorRef.current?.next();
        if (next && !next.done) {
            const v = next.value;
            setState({ 
                window: v.window, currentSum: v.currentSum, 
                best: isFixed ? v.maxSum : (v.minLen === Infinity ? 0 : v.minLen), 
                add: v.addingIdx, rem: v.removingIdx 
            });
            onStateChange(v);
            return true;
        }
        return false;
    };

    useEffect(() => {
        controls.current = { 
            advanceStep: advance, 
            reset: startSim, 
            initializeVisualization: (d) => { setArray(d); startSim(); }
        };
    }, [array, constraint]);

    return (
        <div className="flex flex-col h-full w-full items-center p-8 bg-white overflow-hidden">
            {/* 1. Configuration Input Panel */}
            <div className="flex gap-4 mb-10 bg-slate-50 p-6 rounded-3xl border border-slate-200 items-end shadow-sm">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase text-indigo-500 ml-1 tracking-widest">
                        {isFixed ? "Fixed Window Size (K)" : "Target Sum (≥K)"}
                    </label>
                    <input 
                        type="number" value={constraint} 
                        onChange={e => setConstraint(Number(e.target.value))} 
                        className="p-3 border-2 border-slate-200 rounded-xl w-32 font-bold focus:border-indigo-500 outline-none" 
                    />
                </div>
                <button onClick={startSim} className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg h-[52px] active:scale-95 transition-all">
                    Initialize Window
                </button>
            </div>

            {/* 2. Main Visualization Arena */}
            <div className="relative flex items-center justify-center gap-4 py-24 w-full overflow-x-auto custom-scrollbar">
                {array.map((val, i) => (
                    <div key={i} className="relative flex flex-col items-center flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black transition-all duration-300 ${
                            i === state.add ? 'bg-indigo-100 text-indigo-700 border-4 border-indigo-500 scale-110 shadow-lg' :
                            i === state.rem ? 'bg-red-50 text-red-500 border-2 border-red-300 opacity-50' :
                            'bg-slate-50 text-slate-800 border border-slate-200'
                        }`}>
                            {val}
                        </div>
                        <span className="text-[10px] mt-2 font-bold text-slate-400">[{i}]</span>
                    </div>
                ))}

                {/* Shifting Window Line (Bracket) */}
                {state.window[0] !== -1 && (
                    <motion.div 
                        initial={false}
                        animate={{ 
                            left: `${(state.window[0] * 80) + 16}px`, 
                            width: `${((state.window[1] - state.window[0] + 1) * 80) - 16}px`
                        }}
                        className="absolute bottom-12 h-2 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.7)]"
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-indigo-600 bg-white px-3 py-1 rounded-full border border-indigo-100 uppercase tracking-tighter whitespace-nowrap shadow-sm">
                            Active Window
                        </div>
                        {/* Bracket Ends */}
                        <div className="absolute left-0 bottom-0 w-1 h-6 bg-indigo-500 rounded-full" />
                        <div className="absolute right-0 bottom-0 w-1 h-6 bg-indigo-500 rounded-full" />
                    </motion.div>
                )}
            </div>

            {/* 3. Real-time Status Dashboard */}
            <div className="mt-auto flex gap-12 bg-slate-900 text-white p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <div className="text-center min-w-[120px]">
                    <p className="text-[10px] uppercase font-black text-indigo-400 mb-2 tracking-widest">Window Sum</p>
                    <h4 className="text-5xl font-black tabular-nums">{state.currentSum}</h4>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center min-w-[120px]">
                    <p className="text-[10px] uppercase font-black text-teal-400 mb-2 tracking-widest">
                        {isFixed ? "Max Sum Found" : "Min Length"}
                    </p>
                    <h4 className="text-5xl font-black tabular-nums">{state.best}</h4>
                </div>
            </div>
        </div>
    );
};

export default SlidingWindowVisualizer;