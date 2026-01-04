import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Visualizer Component Imports
import SortingVisualizer from '../components/SortingVisualizer.jsx';
import TreeVisualizer from '../components/TreeVisualizer.jsx';
import SearchingVisualizer from '../components/SearchingVisualizer.jsx';
import LinkedListVisualizer from '../components/LinkedListVisualizer.jsx';
import MergeSortVisualizer from '../components/MergeSortVisualizer.jsx';
import StackVisualizer from '../components/StackVisualizer.jsx';
import QueueVisualizer from '../components/QueueVisualizer.jsx';
import GraphVisualizer from '../components/GraphVisualizer.jsx'; 
import HeapVisualizer from '../components/HeapVisualizer.jsx';

// UI Panel Imports
import CodePanel from '../components/CodePanel.jsx';
import VizControls from '../components/ControlBar.jsx';
import AITutorPanel from '../components/AITutorPanel.jsx';

const VisualizerPage = () => {
    const { algoSlug } = useParams();
    
    // Core state for tracking the algorithm's real-time progress
    const [currentVizState, setCurrentVizState] = useState({ 
        codeLine: 1, 
        action: 'INIT', 
        step: 0 
    });
    
    const [speed, setSpeed] = useState(500);
    
    /**
     * controlsRef acts as the bridge between the ControlBar and the specific Visualizer.
     * It allows the ControlBar to call internal functions like advanceStep(), reset(),
     * and initializeVisualization(customData).
     */
    const controlsRef = useRef({});

    // Reset state whenever the algorithm changes
    useEffect(() => {
        setCurrentVizState({ codeLine: 1, action: 'INIT', step: 0 });
    }, [algoSlug]);

    /**
     * Logic to determine which Visualizer component to mount based on the URL slug.
     * This explicitly separates Tree Traversals from Graph Algorithms.
     */
    const renderVisualizer = () => {
        const vizProps = { 
            algoSlug, 
            onStateChange: setCurrentVizState, 
            controls: controlsRef, 
            speed 
        };

        // Category definitions for accurate routing
        const treeAlgos = ['bfs', 'dfs']; 
        const graphAlgos = ['graph-bfs', 'graph-dfs', 'dijkstra', 'kruskal'];
        const searchingAlgos = ['linear-search', 'binary-search'];
        const linkedListAlgos = ['ll-insert', 'll-delete'];
        // Inside VisualizerPage.jsx -> renderVisualizer function
        const priorityQueueAlgos = ['min-heap', 'max-heap', 'priority-queue'];

        
        // 1. Specialized Logic Visualizers
        if (algoSlug === 'merge-sort') return <MergeSortVisualizer {...vizProps} />;
        if (algoSlug === 'stack') return <StackVisualizer {...vizProps} />;
        if (algoSlug === 'queue') return <QueueVisualizer {...vizProps} />;
        
        // 2. Tree vs Graph Separation
        if (treeAlgos.includes(algoSlug)) return <TreeVisualizer {...vizProps} />;
        if (graphAlgos.includes(algoSlug)) return <GraphVisualizer {...vizProps} />;

        if (priorityQueueAlgos.includes(algoSlug)) {
          return <HeapVisualizer {...vizProps} />;
        }

        
        // 3. Search & Linear Data Structures
        if (searchingAlgos.includes(algoSlug)) return <SearchingVisualizer {...vizProps} />;
        if (linkedListAlgos.includes(algoSlug)) return <LinkedListVisualizer {...vizProps} />;
        
        // 4. Default: Sorting Visualizer (Bubble, Selection, Quick, Insertion)
        return <SortingVisualizer {...vizProps} />;
    };

    return (
        <div className="flex flex-col p-6 lg:p-10 space-y-8 bg-slate-950 min-h-screen text-white animate-fadeIn">
            
            {/* 1. Header & Breadcrumbs */}
            <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                    <Link to="/algorithms" className="hover:text-indigo-400 transition-colors">Dashboard</Link>
                    <span>/</span>
                    <span className="text-indigo-400">Visualization Engine</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter text-glow-indigo capitalize">
                    {algoSlug.replace('-', ' ')}
                </h1>
            </div>

            {/* 2. Main Visualization Workspace */}
            <div className="flex flex-col xl:flex-row gap-8 items-stretch">
                
                {/* Visualizer Container */}
                <div className="flex-[2] flex flex-col rounded-3xl glass-panel border border-white/5 overflow-hidden shadow-2xl">
                    <div className="px-8 py-5 flex items-center justify-between border-b border-white/5 bg-white/5">
                        <span className="text-xs font-black uppercase tracking-widest text-indigo-300">Live Simulation</span>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                    </div>
                    
                    {/* The Canvas: White background for maximum node/bar contrast */}
                    <div className="bg-white m-6 rounded-2xl h-[480px] flex items-center justify-center overflow-hidden relative shadow-inner">
                        {renderVisualizer()}
                    </div>
                </div>

                {/* Logic/Code Panel */}
                <div className="flex-1 flex flex-col min-h-[500px]">
                    <CodePanel 
                        highlightedLine={currentVizState.codeLine} 
                        algoSlug={algoSlug} 
                    />
                </div>
            </div>

            {/* 3. Real-Time Interaction Layer */}
            <div className="grid grid-cols-1 gap-8">
                
                {/* Control Bar: Speed, Custom Input, and Playback */}
                <div className="rounded-3xl glass-panel p-2 border border-white/10">
                    <VizControls 
                        currentVizState={currentVizState} 
                        controls={controlsRef} 
                        onSpeedChange={setSpeed} 
                    />
                </div>

                {/* AI Tutor Engine: State-aware pedagogical feedback */}
                <div className="pb-12">
                    <AITutorPanel 
                        currentVisualizationState={currentVizState} 
                        algoSlug={algoSlug} 
                    />
                </div>
            </div>
        </div>
    );
};

export default VisualizerPage;