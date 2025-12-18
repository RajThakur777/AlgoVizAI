// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import AlgorithmCard from '../components/AlgorithmCard';

const CATEGORIES = {
    'Sorting Algorithms': [
        { name: 'Bubble Sort', path: '/visualizer/sorting/bubble-sort' },
        { name: 'Merge Sort', path: '/visualizer/sorting/merge-sort' },
        { name: 'Quick Sort', path: '/visualizer/sorting/quick-sort' },
    ],
    'Tree & Graph': [
        { name: 'BFS Traversal', path: '/visualizer/graph/bfs' },
        { name: 'DFS Traversal', path: '/visualizer/graph/dfs' },
        { name: 'Binary Search Tree (BST)', path: '/visualizer/tree/bst' },
    ],
    'Dynamic Programming': [
        { name: '0/1 Knapsack', path: '/visualizer/dp/knapsack' },
        { name: 'Longest Common Subsequence (LCS)', path: '/visualizer/dp/lcs' },
    ],
};

const HomePage = () => {
    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white mb-8 border-b border-indigo-400/50 pb-2">
                🎓 AlgoViz Pro: Interactive DSA Learning
            </h1>
            
            <p className="text-lg text-gray-300 mb-8">
                Select a category below to start visualizing algorithms, testing custom inputs, and getting AI-powered explanations.
            </p>

            {Object.entries(CATEGORIES).map(([categoryName, algorithms]) => (
                <div key={categoryName} className="mb-10">
                    <h2 className="text-3xl font-bold text-indigo-300 mb-6">{categoryName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {algorithms.map(algo => (
                            <AlgorithmCard key={algo.path} name={algo.name} path={algo.path} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage;