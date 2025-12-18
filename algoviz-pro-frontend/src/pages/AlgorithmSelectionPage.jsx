// src/pages/AlgorithmSelectionPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import AlgorithmCard from '../components/AlgorithmCard.jsx';

const CATEGORIES = {
    'Sorting Algorithms': [
        { name: 'Bubble Sort', path: '/visualizer/bubble-sort', desc: 'O(n²) comparison-based sorting.' },
        { name: 'Selection Sort', path: '/visualizer/selection-sort', desc: 'Simple in-place comparison sort.' },
        { name: 'Insertion Sort', path: '/visualizer/insertion-sort', desc: 'Builds the final sorted array one item at a time.' },
        { name: 'Quick Sort', path: '/visualizer/quick-sort', desc: 'Efficient divide and conquer approach.' },
        { name: 'Merge Sort', path: '/visualizer/merge-sort', desc: 'Stable, recursive O(n log n) sorting.' }
    ],
    'Searching Algorithms': [
        { name: 'Linear Search', path: '/visualizer/linear-search', desc: 'Check every element sequentially.' },
        { name: 'Binary Search', path: '/visualizer/binary-search', desc: 'Optimized search for sorted datasets.' }
    ],
    'Linear Data Structures': [
        { name: 'Linked List', path: '/visualizer/ll-insert', desc: 'Dynamic node-based linear structure.' },
        { name: 'Stack (LIFO)', path: '/visualizer/stack', desc: 'Last-In, First-Out element processing.' },
        { name: 'Queue (FIFO)', path: '/visualizer/queue', desc: 'First-In, First-Out sequence handling.' }
    ],
    'Tree & Graph Traversals': [
        { name: 'BFS Traversal', path: '/visualizer/bfs', desc: 'Breadth-First level-order exploration.' },
        { name: 'DFS Traversal', path: '/visualizer/dfs', desc: 'Depth-First recursive path discovery.' },
        { name: 'Dijkstra', path: '/visualizer/dijkstra', desc: 'Shortest path algorithm for weighted graphs.' },
        { name: 'Kruskal', path: '/visualizer/kruskal', desc: 'Minimum Spanning Tree discovery.' }
    ],
};

const AlgorithmSelectionPage = () => {
    return (
        <div className="p-8 lg:p-12 w-full max-w-7xl mx-auto min-h-screen text-white">
            {/* Animated Header Section */}
            <motion.header 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20 relative"
            >
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
                <h1 className="text-7xl font-black mb-6 tracking-tighter text-glow-indigo">
                    Select <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400">Path.</span>
                </h1>
                <p className="text-xl text-gray-400 font-medium max-w-2xl leading-relaxed">
                    Begin your high-fidelity visualization journey. Each module is optimized for 
                    <span className="text-indigo-300"> conceptual clarity</span> and <span className="text-indigo-300">AI-assisted learning.</span>
                </p>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "6rem" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-1.5 bg-gradient-to-r from-indigo-500 to-teal-400 mt-10 rounded-full" 
                />
            </motion.header>

            {Object.entries(CATEGORIES).map(([categoryName, algorithms], idx) => (
                <motion.div 
                    key={categoryName}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-6 mb-12">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400/80">
                            {categoryName}
                        </h2>
                        <div className="flex-1 h-[1px] bg-white/5" />
                        <span className="glass-panel text-[9px] font-bold text-gray-400 px-4 py-1.5 rounded-full border border-white/5 uppercase tracking-widest">
                            {algorithms.length} Modules
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {algorithms.map((algo, aIdx) => (
                            <motion.div
                                key={algo.path}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <AlgorithmCard 
                                    name={algo.name} 
                                    path={algo.path}
                                    description={algo.desc} 
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default AlgorithmSelectionPage;