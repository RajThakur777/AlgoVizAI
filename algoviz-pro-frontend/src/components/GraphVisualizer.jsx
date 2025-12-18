// src/components/GraphVisualizer.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { dijkstraLogic, kruskalLogic } from '../algorithms/graphLogic';

const GraphVisualizer = ({ algoSlug, onStateChange, controls }) => {
    const svgRef = useRef();
    const [graphState, setGraphState] = useState({ 
        items: [], visited: [], currentNode: null, 
        mstEdges: [], currentEdge: null, parent: {},
        remainingEdges: [], distances: {}, previous: {},
        source: 0, target: 3 // Default source/target
    });
    const generatorRef = useRef(null);

    // Graph Data 
    const nodes = [{ id: 0, x: 80, y: 150 }, { id: 1, x: 180, y: 80 }, { id: 2, x: 180, y: 220 }, { id: 3, x: 300, y: 150 }];
    const kruskalEdges = [
        { u: 0, v: 1, weight: 4 }, { u: 0, v: 2, weight: 2 }, 
        { u: 1, v: 2, weight: 5 }, { u: 1, v: 3, weight: 10 }, 
        { u: 2, v: 3, weight: 3 }
    ];
    const adjList = { 
        0: [{ node: 1, weight: 4 }, { node: 2, weight: 2 }], 
        1: [{ node: 3, weight: 10 }], 
        2: [{ node: 1, weight: 1 }, { node: 3, weight: 3 }],
        3: [] 
    };

    // Helper to reconstruct path from target back to source
    const reconstructPath = (previous, start, end) => {
        let path = [];
        let current = end;
        while (current !== null && current !== start) {
            path.push(current);
            current = previous[current];
        }
        if (current === start) path.push(start);
        return path.reverse();
    };

    const init = () => {
        let logic;
        if (algoSlug === 'kruskal') {
            logic = kruskalLogic(nodes, kruskalEdges);
        } else {
            // Dijkstra logic uses defined source/target
            logic = dijkstraLogic(nodes, adjList, 0, 3); 
        }

        generatorRef.current = logic;
        const first = generatorRef.current.next().value;
        setGraphState(first);
        onStateChange(first);
    };

    useEffect(() => {
        init();
        controls.current = {
            advanceStep: () => {
                const next = generatorRef.current.next();
                if (!next.done) {
                    setGraphState(next.value);
                    onStateChange(next.value);
                    return true;
                }
                return false;
            },
            reset: init
        };
    }, [algoSlug]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const g = svg.append("g").attr("transform", "translate(40, 40)");

        const pathNodes = graphState.action === 'COMPLETE' && algoSlug === 'dijkstra' 
                          ? reconstructPath(graphState.previous, graphState.source, graphState.target) 
                          : [];

        // --- 1. Draw Edges ---
        kruskalEdges.forEach(e => {
            const source = nodes[e.u];
            const target = nodes[e.v];
            
            let strokeColor = "#e2e8f0";
            let strokeWidth = 2;
            
            if (algoSlug === 'kruskal') {
                const isMST = (graphState.mstEdges || []).some(mstE => (mstE.u === e.u && mstE.v === e.v) || (mstE.u === e.v && mstE.v === e.u));
                const isCurrent = graphState.currentEdge && ((graphState.currentEdge.u === e.u && graphState.currentEdge.v === e.v) || (graphState.currentEdge.u === e.v && graphState.currentEdge.v === e.u));

                if (isMST) {
                    strokeColor = "#4ade80"; strokeWidth = 4;
                } else if (isCurrent) {
                    strokeColor = graphState.action === 'REJECT_CYCLE' ? "#ef4444" : "#facc15"; strokeWidth = 3;
                }
            } else if (algoSlug === 'dijkstra' && graphState.action === 'COMPLETE') {
                 // Highlight final shortest path
                const isPathEdge = pathNodes.includes(e.u) && pathNodes.includes(e.v) && (graphState.previous[e.v] === e.u || graphState.previous[e.u] === e.v);
                if (isPathEdge) {
                     strokeColor = "#059669"; strokeWidth = 4;
                }
            }
            
            g.append("line").attr("x1", source.x).attr("y1", source.y).attr("x2", target.x).attr("y2", target.y)
                .attr("stroke", strokeColor).attr("stroke-width", strokeWidth);
            
            g.append("text").attr("x", (source.x + target.x)/2).attr("y", (source.y + target.y)/2 - 5)
                .attr("fill", "#94a3b8").style("font-size", "10px").text(e.weight);
        });

        // --- 2. Draw Nodes ---
        nodes.forEach(n => {
            const isVisited = (graphState.visited || []).includes(n.id);
            const isCurrent = graphState.currentNode === n.id;
            const nodeG = g.append("g").attr("transform", `translate(${n.x}, ${n.y})`);
            
            // Node Fill
            let fill = isCurrent ? "#facc15" : (isVisited ? "#4ade80" : "#6366f1");
            if (algoSlug === 'dijkstra' && pathNodes.includes(n.id)) fill = "#059669"; // Final Path

            nodeG.append("circle").attr("r", 20).attr("fill", fill).attr("stroke", "#fff").attr("stroke-width", 2);
            nodeG.append("text").attr("text-anchor", "middle").attr("dy", ".35em").attr("fill", "white").style("font-weight", "bold").text(n.id);
            
            // Dijkstra: Display current shortest distance
            if (algoSlug === 'dijkstra') {
                const dist = graphState.distances[n.id] === Infinity ? '∞' : graphState.distances[n.id];
                const color = n.id === graphState.target && graphState.action === 'COMPLETE' ? '#ef4444' : '#6366f1';

                nodeG.append("text").attr("y", -30).attr("text-anchor", "middle").attr("fill", color).style("font-size", "10px").style("font-weight", "bold").text(`D: ${dist}`);
            }
        });

        // --- 3. Vertical Data Structure Overlay (PQ/Sorted Edges) ---
        if (algoSlug === 'dijkstra' || algoSlug === 'kruskal') {
            const structG = svg.append("g").attr("transform", "translate(400, 40)");
            
            let label, items;

            if (algoSlug === 'dijkstra') {
                label = "PRIORITY Q (Dist)";
                items = graphState.items || [];
                // Sort items here for reliable visualization 
                items.sort((a, b) => a.d - b.d); 
            } else if (algoSlug === 'kruskal') {
                label = "SORTED EDGES (QUEUE)";
                items = graphState.remainingEdges || []; 
            }

            // Always render the structure container
            structG.append("path").attr("d", "M 0,0 L 0,250 L 100,250 L 100,0").attr("fill", "none").attr("stroke", "#6366f1").attr("stroke-width", 4);
            structG.append("text").attr("x", 50).attr("y", -10).attr("text-anchor", "middle").attr("fill", "#6366f1").style("font-weight", "900").text(label);

            
            // Render items in the vertical container
            (items || []).slice(0, 5).forEach((item, i) => { 
                const itemG = structG.append("g").attr("transform", `translate(10, ${200 - i * 45})`);
                
                let text;
                if (algoSlug === 'dijkstra') {
                    text = `Node ${item.id} (d:${item.d})`;
                } else if (algoSlug === 'kruskal') {
                    text = `${item.u}-${item.v} (w:${item.weight})`;
                }

                itemG.append("rect").attr("width", 80).attr("height", 40).attr("rx", 6).attr("fill", "#facc15");
                itemG.append("text").attr("x", 40).attr("y", 20).attr("text-anchor", "middle").attr("fill", "black").style("font-size", "10px").style("font-weight", "bold").text(text);
            });
            
            // Dijkstra: Display Source/Target info and Final Distance
            if (algoSlug === 'dijkstra') {
                 structG.append("text").attr("x", 50).attr("y", 290).attr("text-anchor", "middle").attr("fill", "#6366f1").style("font-size", "12px").style("font-weight", "bold").text(`Src: ${graphState.source} -> Dest: ${graphState.target}`);
                 
                 const finalDist = graphState.distances[graphState.target] === Infinity ? 'Path Not Found' : graphState.distances[graphState.target];
                 structG.append("text").attr("x", 50).attr("y", 310).attr("text-anchor", "middle").attr("fill", "#ef4444").style("font-size", "14px").style("font-weight", "bold").text(`Total Dist: ${finalDist}`);
            }
        }
    }, [graphState, algoSlug]);

    return (
        <div className="w-full h-full bg-white flex items-center justify-center p-4">
            <svg ref={svgRef} width="550" height="350" viewBox="0 0 550 350" preserveAspectRatio="xMidYMid meet" />
        </div>
    );
};
export default GraphVisualizer;