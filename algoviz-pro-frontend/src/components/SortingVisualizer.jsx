import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bubbleSort, selectionSort, insertionSort, quickSort } from '../algorithms/sorting.js';

const SortingVisualizer = ({ algoSlug, onStateChange, controls, speed }) => {
    const [array, setArray] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [generator, setGenerator] = useState(null);

    // Initial random array generator
    const generateRandomArray = useCallback((size = 10) => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    }, []);

    // Core Logic: (Re)Initialize the visualization
    const initializeVisualization = useCallback((customArray = null) => {
        const baseArray = customArray || generateRandomArray();
        setArray(baseArray);
        setHighlights([]);
        
        let gen;
        if (algoSlug === 'bubble-sort') gen = bubbleSort(baseArray);
        else if (algoSlug === 'selection-sort') gen = selectionSort(baseArray);
        else if (algoSlug === 'insertion-sort') gen = insertionSort(baseArray);
        else gen = quickSort(baseArray);

        setGenerator(gen);
        onStateChange({ step: 0, action: 'READY', codeLine: 1 });
    }, [algoSlug, onStateChange, generateRandomArray]);

    // Expose controls to the parent (VisualizerPage -> ControlBar)
    useEffect(() => {
        controls.current = {
            advanceStep: () => {
                if (!generator) return false;
                const { value, done } = generator.next();
                if (done) return false;

                setArray(value.array);
                setHighlights(value.highlights);
                onStateChange(value);
                return true;
            },
            reset: () => initializeVisualization(),
            initializeVisualization: (data) => initializeVisualization(data),
            visualArray: array
        };
    }, [generator, array, initializeVisualization, onStateChange, controls]);

    useEffect(() => {
        initializeVisualization();
    }, [algoSlug]);

    return (
        <div className="flex items-end justify-center gap-2 w-full h-full px-10 pb-10 overflow-hidden">
            <AnimatePresence>
                {array.map((value, idx) => {
                    const isHighlighted = highlights.includes(idx);
                    return (
                        <motion.div
                            key={`${idx}-${value}`}
                            layout
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            className="relative flex flex-col items-center flex-1 max-w-[50px]"
                            style={{ height: `${value}%` }}
                        >
                            <div 
                                className={`w-full h-full rounded-t-lg transition-colors duration-300 ${
                                    isHighlighted ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 'bg-indigo-500'
                                }`} 
                            />
                            <span className="absolute -bottom-8 text-[10px] font-bold text-slate-400">
                                {value}
                            </span>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default SortingVisualizer;