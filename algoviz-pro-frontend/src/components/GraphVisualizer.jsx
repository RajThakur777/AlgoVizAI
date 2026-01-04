// src/components/GraphVisualizer.jsx
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { dijkstraLogic, kruskalLogic, graphBFS, graphDFS } from '../algorithms/graphLogic';

const GraphVisualizer = ({ algoSlug, onStateChange, controls }) => {
    const svgRef = useRef();
    const [graphState, setGraphState] = useState({ 
        items: [], visited: [], currentNode: null, 
        mstEdges: [], currentEdge: null, parent: {},
        remainingEdges: [], distances: {}, previous: {},
        source: 0, target: 3
    });
    const generatorRef = useRef(null);

    // Initial Graph Data
    const nodes = [{ id: 0, x: 80, y: 150 }, { id: 1, x: 180, y: 80 }, { id: 2, x: 180, y: 220 }, { id: 3, x: 300, y: 150 }];
    const edges = [
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

    const init = () => {
        let logic;
        if (algoSlug === 'kruskal') logic = kruskalLogic(nodes, edges);
        else if (algoSlug === 'dijkstra') logic = dijkstraLogic(nodes, adjList, 0, 3);
        else if (algoSlug === 'graph-bfs') logic = graphBFS(nodes, adjList, 0);
        else if (algoSlug === 'graph-dfs') logic = graphDFS(nodes, adjList, 0);

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

        // 1. Draw Edges
        edges.forEach(e => {
            const source = nodes[e.u];
            const target = nodes[e.v];
            let strokeColor = "#e2e8f0";
            let strokeWidth = 2;

            if (algoSlug === 'kruskal') {
                const isMST = (graphState.mstEdges || []).some(m => (m.u === e.u && m.v === e.v) || (m.u === e.v && m.v === e.u));
                if (isMST) { strokeColor = "#4ade80"; strokeWidth = 4; }
            }
            
            g.append("line").attr("x1", source.x).attr("y1", source.y).attr("x2", target.x).attr("y2", target.y)
                .attr("stroke", strokeColor).attr("stroke-width", strokeWidth);
        });

        // 2. Draw Nodes
        nodes.forEach(n => {
            const isVisited = (graphState.visited || []).includes(n.id);
            const isCurrent = graphState.currentNode === n.id;
            const nodeG = g.append("g").attr("transform", `translate(${n.x}, ${n.y})`);
            
            let fill = isCurrent ? "#facc15" : (isVisited ? "#4ade80" : "#6366f1");
            nodeG.append("circle").attr("r", 20).attr("fill", fill).attr("stroke", "#fff").attr("stroke-width", 2);
            nodeG.append("text").attr("text-anchor", "middle").attr("dy", ".35em").attr("fill", "white").style("font-weight", "bold").text(n.id);
        });

        // 3. Data Structure Overlay
        const structG = svg.append("g").attr("transform", "translate(400, 40)");
        let label, items;

        if (algoSlug === 'graph-bfs') { label = "QUEUE (FIFO)"; items = graphState.items || []; }
        else if (algoSlug === 'graph-dfs') { label = "STACK (LIFO)"; items = graphState.items || []; }
        else if (algoSlug === 'dijkstra') { label = "PRIORITY Q"; items = graphState.items || []; }
        else { label = "EDGES"; items = graphState.remainingEdges || []; }

        structG.append("path").attr("d", "M 0,0 L 0,250 L 100,250 L 100,0").attr("fill", "none").attr("stroke", "#6366f1").attr("stroke-width", 4);
        structG.append("text").attr("x", 50).attr("y", -10).attr("text-anchor", "middle").attr("fill", "#6366f1").style("font-weight", "900").text(label);

        (items || []).slice(0, 5).forEach((item, i) => { 
            const itemG = structG.append("g").attr("transform", `translate(10, ${200 - i * 45})`);
            const val = typeof item === 'object' ? item.id : item;
            itemG.append("rect").attr("width", 80).attr("height", 40).attr("rx", 6).attr("fill", "#facc15");
            itemG.append("text").attr("x", 40).attr("y", 20).attr("text-anchor", "middle").attr("fill", "black").style("font-size", "10px").style("font-weight", "bold").text(`Node ${val}`);
        });
    }, [graphState, algoSlug]);

    return (
        <div className="w-full h-full bg-white flex items-center justify-center p-4">
            <svg ref={svgRef} width="550" height="350" viewBox="0 0 550 350" preserveAspectRatio="xMidYMid meet" />
        </div>
    );
};
export default GraphVisualizer;