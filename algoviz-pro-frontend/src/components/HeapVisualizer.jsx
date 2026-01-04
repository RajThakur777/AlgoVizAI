// src/components/HeapVisualizer.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heapInsert } from '../algorithms/heapLogic';

const HeapVisualizer = ({ algoSlug, onStateChange, controls }) => {
    // Initial Min-Heap compliant array
    const [array, setArray] = useState([10, 25, 40, 50, 60, 70, 80]);
    const [highlights, setHighlights] = useState([]);
    const [generator, setGenerator] = useState(null);

    const initialize = useCallback((customData = null) => {
        const base = customData || [10, 25, 40, 50, 60, 70, 80];
        setArray(base);
        setGenerator(null);
        setHighlights([]);
        onStateChange({ action: 'READY', step: 0, codeLine: 1 });
    }, [onStateChange]);

    useEffect(() => {
        controls.current = {
            advanceStep: () => {
                if (!generator) {
                    // Logic: Take the current array, remove last element, and re-insert it to show "Bubble Up"
                    const type = algoSlug.includes('max') ? 'max' : 'min';
                    const lastVal = array[array.length - 1];
                    const baseArr = array.slice(0, -1);
                    const gen = heapInsert(baseArr, lastVal, type);
                    setGenerator(gen);
                    return true;
                }
                const { value, done } = generator.next();
                if (done) return false;
                setArray(value.array);
                setHighlights(value.highlights);
                onStateChange(value);
                return true;
            },
            reset: initialize,
            initializeVisualization: (data) => initialize(data)
        };
    }, [generator, array, algoSlug, onStateChange, controls, initialize]);

    // Tree Layout Helpers
    const getLevel = (index) => Math.floor(Math.log2(index + 1));
    const getPosition = (index) => {
        const level = getLevel(index);
        const numNodesAtLevel = Math.pow(2, level);
        const horizontalSpacing = 400 / numNodesAtLevel;
        const x = (index - (numNodesAtLevel - 1)) * horizontalSpacing + horizontalSpacing / 2 - 200;
        const y = level * 80 - 150;
        return { x, y };
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 overflow-visible">
            {/* 1. Array Representation (Top) */}
            <div className="flex gap-2 mb-20 bg-slate-100 p-4 rounded-xl shadow-inner border border-slate-200">
                {array.map((val, i) => (
                    <div key={`arr-${i}`} className="flex flex-col items-center">
                        <motion.div
                            animate={{ 
                                backgroundColor: highlights.includes(i) ? '#facc15' : '#6366f1',
                                scale: highlights.includes(i) ? 1.1 : 1
                            }}
                            className="w-10 h-10 flex items-center justify-center rounded shadow-lg text-white font-bold text-xs"
                        >
                            {val}
                        </motion.div>
                        <span className="text-[8px] text-slate-400 mt-1">[{i}]</span>
                    </div>
                ))}
            </div>

            {/* 2. Tree Representation (Center) */}
            <div className="relative w-full h-[300px] flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {array.map((_, i) => {
                        if (i === 0) return null;
                        const parent = Math.floor((i - 1) / 2);
                        const start = getPosition(parent);
                        const end = getPosition(i);
                        return (
                            <line 
                                key={`edge-${i}`} 
                                x1={start.x + 250} y1={start.y + 150} 
                                x2={end.x + 250} y2={end.y + 150} 
                                stroke="#cbd5e1" strokeWidth="2"
                            />
                        );
                    })}
                </svg>

                <AnimatePresence>
                    {array.map((val, i) => {
                        const { x, y } = getPosition(i);
                        return (
                            <motion.div
                                key={`node-${i}`}
                                layout
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: 1, scale: 1, x, y,
                                    backgroundColor: highlights.includes(i) ? '#facc15' : '#4338ca'
                                }}
                                className="absolute w-12 h-12 flex items-center justify-center rounded-full text-white font-black shadow-xl border-4 border-white cursor-default"
                            >
                                {val}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
            
            <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                {algoSlug.includes('max') ? "Max-Heap Property: Parent ≥ Children" : "Min-Heap Property: Parent ≤ Children"}
            </div>
        </div>
    );
};

export default HeapVisualizer;