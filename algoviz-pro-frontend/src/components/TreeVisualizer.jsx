import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { bfs, dfs, generateTreeData } from '../algorithms/treeTraversals';

const TreeVisualizer = ({ algoSlug, onStateChange, controls }) => {
    const svgRef = useRef();
    const [treeData] = useState(generateTreeData());
    const [currentState, setCurrentState] = useState({ visited: [], current: null });
    const generatorRef = useRef(null);

    const init = (slug) => {
        generatorRef.current = slug === 'bfs' ? bfs(treeData) : dfs(treeData);
        const firstStep = generatorRef.current.next().value;
        setCurrentState(firstStep);
        onStateChange(firstStep); 
    };

    useEffect(() => {
        controls.current = { 
            advanceStep: () => {
                const next = generatorRef.current.next();
                if (!next.done) {
                    setCurrentState(next.value);
                    onStateChange(next.value);
                    return true;
                }
                return false;
            },
            reset: () => init(algoSlug)
        };
    }, [algoSlug, onStateChange]);

    useEffect(() => { init(algoSlug); }, [algoSlug]);

    useEffect(() => {
        if (!currentState) return;
        
        // Define canvas dimensions based on container
        const width = 600;
        const height = 400; // Total SVG height
        
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); 
        
        // Adjust translation to center the tree and provide top/bottom padding
        const g = svg.append("g").attr("transform", "translate(50, 50)");

        // FIXED: Reduced vertical size from 300 to 220 to prevent cutting
        const treeLayout = d3.tree().size([width - 100, 220]);
        const root = d3.hierarchy(treeData);
        treeLayout(root);

        // Render Edges
        g.selectAll(".link").data(root.links()).enter().append("path")
            .attr("d", d3.linkVertical().x(d => d.x).y(d => d.y))
            .attr("fill", "none")
            .attr("stroke", "#cbd5e1")
            .attr("stroke-width", 2);

        // Render Nodes
        const nodes = g.selectAll(".node").data(root.descendants()).enter().append("g")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        nodes.append("circle").attr("r", 22)
            .attr("fill", d => {
                if (d.data.id === currentState.current) return "#facc15"; // Yellow: Active
                return currentState.visited.includes(d.data.id) ? "#4ade80" : "#6366f1"; // Green: Visited
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .style("filter", "drop-shadow(0 4px 6px rgba(0,0,0,0.1))");

        nodes.append("text").attr("dy", ".35em").attr("text-anchor", "middle")
            .text(d => d.data.name).attr("fill", "white").style("font-weight", "900");
            
    }, [currentState]);

    return (
        <div className="w-full h-full flex items-center justify-center p-4 bg-white rounded-xl overflow-hidden">
            {/* preserveAspectRatio ensures the tree fits within the dashboard arena */}
            <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" />
        </div>
    );
};

export default TreeVisualizer;