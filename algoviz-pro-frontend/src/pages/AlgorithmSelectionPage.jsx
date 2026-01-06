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
    'Heaps & Priority Queue': [
        { name: 'Min Heap', path: '/visualizer/min-heap', desc: 'Parent node is always smaller than children.' },
        { name: 'Max Heap', path: '/visualizer/max-heap', desc: 'Parent node is always larger than children.' }
    ],
    'Linear Data Structures': [
        { name: 'Linked List', path: '/visualizer/ll-insert', desc: 'Dynamic node-based linear structure.' },
        { name: 'Stack (LIFO)', path: '/visualizer/stack', desc: 'Last-In, First-Out element processing.' },
        { name: 'Queue (FIFO)', path: '/visualizer/queue', desc: 'First-In, First-Out sequence handling.' }
    ],
    'Tree Traversals': [
        { name: 'BFS Traversal', path: '/visualizer/bfs', desc: 'Breadth-First level-order exploration.' },
        { name: 'DFS Traversal', path: '/visualizer/dfs', desc: 'Depth-First recursive path discovery.' }
    ],
    'Graph Algorithms': [
        { name: 'BFS (Graph)', path: '/visualizer/graph-bfs', desc: 'Exploration using a Queue and Visited Set.' },
        { name: 'DFS (Graph)', path: '/visualizer/graph-dfs', desc: 'Exploration using a Stack and Visited Set.' },
        { name: 'Dijkstra', path: '/visualizer/dijkstra', desc: 'Shortest path for weighted graphs.' },
        { name: 'Kruskal', path: '/visualizer/kruskal', desc: 'Minimum Spanning Tree discovery.' }
    ],
    'Hashing Algorithms': [
        { name: 'HashMap', path: '/visualizer/hash-map', desc: 'K-V pairs using buckets and chaining.' },
        { name: 'HashSet', path: '/visualizer/hash-set', desc: 'Stores unique elements via hash index.' }
    ],
    'Sliding Window': [
    { name: 'Fixed Window', path: '/visualizer/sliding-window-fixed', desc: 'Maintain a window of size K to find subarrays.' },
    { name: 'Variable Window', path: '/visualizer/sliding-window-variable', desc: 'Expand and shrink window based on conditions.' }
    ],
};

const AlgorithmSelectionPage = () => {
    return (
        <div className="p-8 lg:p-12 w-full max-w-7xl mx-auto min-h-screen text-white relative">
            {/* Background Decorative Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
            </div>

            <motion.header 
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-24 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <span className="h-px w-12 bg-indigo-500/50" />
                    <span className="text-xs font-black uppercase tracking-[0.5em] text-indigo-400">Visualization Engine</span>
                </div>
                <h1 className="text-8xl font-black mb-8 tracking-tighter text-glow-indigo">
                    Select <span className="bg-clip-text text-transparent bg-gradient-to-br from-indigo-300 via-teal-200 to-emerald-400">Path.</span>
                </h1>
                <p className="text-2xl text-gray-400 font-light max-w-3xl leading-relaxed">
                    Choose a module to begin your high-fidelity simulation journey. Optimized for 
                    <span className="text-indigo-300 font-medium"> algorithmic intuition</span> and real-time state analysis.
                </p>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "8rem" }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="h-2 bg-gradient-to-r from-indigo-600 to-teal-400 mt-12 rounded-full" 
                />
            </motion.header>

            {Object.entries(CATEGORIES).map(([categoryName, algorithms], idx) => (
                <motion.div 
                    key={categoryName}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className="mb-32 relative z-10"
                >
                    <div className="flex items-center gap-8 mb-16">
                        <div className="flex flex-col">
                            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-indigo-400 mb-2">
                                {categoryName}
                            </h2>
                            <div className="h-1 w-12 bg-indigo-500/30 rounded-full" />
                        </div>
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="glass-panel text-[10px] font-black text-gray-400 px-6 py-2 rounded-full border border-white/5 uppercase tracking-[0.2em] shadow-xl">
                            {algorithms.length} Core Modules
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {algorithms.map((algo) => (
                            <motion.div
                                key={algo.path}
                                whileHover={{ y: -12, scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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