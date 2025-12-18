import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import SortingVisualizer from '../components/SortingVisualizer.jsx';
import TreeVisualizer from '../components/TreeVisualizer.jsx';
import SearchingVisualizer from '../components/SearchingVisualizer.jsx';
import LinkedListVisualizer from '../components/LinkedListVisualizer.jsx';
import MergeSortVisualizer from '../components/MergeSortVisualizer.jsx';
import StackVisualizer from '../components/StackVisualizer.jsx';
import QueueVisualizer from '../components/QueueVisualizer.jsx';
import GraphVisualizer from '../components/GraphVisualizer.jsx'; 
import CodePanel from '../components/CodePanel.jsx';
import VizControls from '../components/ControlBar.jsx';
import AITutorPanel from '../components/AITutorPanel.jsx';

const VisualizerPage = () => {
    const { algoSlug } = useParams();
    const [currentVizState, setCurrentVizState] = useState({ codeLine: 1, action: 'INIT', step: 0 });
    const [speed, setSpeed] = useState(500);
    const controlsRef = useRef({});

    const renderVisualizer = () => {
    const vizProps = { 
        algoSlug, 
        onStateChange: setCurrentVizState, 
        controls: controlsRef, 
        speed 
    };

    // Separate based on logic type
    const treeAlgos = ['bfs', 'dfs']; // Standard Tree Traversals
    const graphAlgos = ['graph-bfs', 'graph-dfs', 'dijkstra', 'kruskal']; // Graph Algorithms

    if (algoSlug === 'merge-sort') return <MergeSortVisualizer {...vizProps} />;
    
    // Explicitly separate Tree and Graph
    if (treeAlgos.includes(algoSlug)) return <TreeVisualizer {...vizProps} />;
    if (graphAlgos.includes(algoSlug)) return <GraphVisualizer {...vizProps} />;
    
    if (algoSlug === 'stack') return <StackVisualizer {...vizProps} />;
    if (algoSlug === 'queue') return <QueueVisualizer {...vizProps} />;
    if (['linear-search', 'binary-search'].includes(algoSlug)) return <SearchingVisualizer {...vizProps} />;
    if (['ll-insert', 'll-delete'].includes(algoSlug)) return <LinkedListVisualizer {...vizProps} />;
    
    return <SortingVisualizer {...vizProps} />;
};

    return (
        <div className="flex flex-col p-8 space-y-8 bg-slate-950 min-h-screen text-white">
            {/* Breadcrumbs for location awareness */}
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                <Link to="/algorithms" className="hover:text-indigo-400 transition">Dashboard</Link>
                <span>/</span>
                <span className="text-indigo-400">{algoSlug.replace('-', ' ')} Execution</span>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
                {/* Visualizer Container: Static height, NO internal scrolling */}
                <div className="flex-[2] flex flex-col rounded-3xl bg-slate-900/40 border border-indigo-500/20 shadow-2xl overflow-hidden">
                    <div className="px-8 py-5 text-xl font-black text-indigo-400 uppercase tracking-widest border-b border-white/10 bg-black/20 shrink-0">
                       Visualization Arena
                    </div>
                    {/* Fixed height ensures visualization stays in one frame */}
                    <div className="bg-white m-6 rounded-2xl h-[450px] flex items-center justify-center overflow-hidden relative shadow-inner">
                        {renderVisualizer()}
                    </div>
                </div>

                {/* Logic Panel */}
                <div className="flex-1 min-h-[450px]">
                    <CodePanel highlightedLine={currentVizState.codeLine} algoSlug={algoSlug} />
                </div>
            </div>

            {/* Playback Controls */}
            <div className="rounded-3xl bg-slate-900/80 border border-white/10 shadow-lg p-3">
                <VizControls 
                    currentVizState={currentVizState} 
                    controls={controlsRef} 
                    onSpeedChange={setSpeed} 
                />
            </div>

            {/* AI Tutor Engine */}
            <div className="pb-10">
                <AITutorPanel 
                    currentVisualizationState={currentVizState} 
                    algoSlug={algoSlug} 
                />
            </div>
        </div>
    );
};

export default VisualizerPage;