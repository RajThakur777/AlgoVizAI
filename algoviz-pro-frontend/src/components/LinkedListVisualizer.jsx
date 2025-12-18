import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { insertNode, deleteNode } from '../algorithms/linkedList';

const LinkedListVisualizer = ({ algoSlug, onStateChange, controls, speed }) => {
    const svgRef = useRef();
    const [listNodes, setListNodes] = useState([{ id: 'n1', data: 10 }, { id: 'n2', data: 20 }]);
    const [inputValue, setInputValue] = useState("");
    const generatorRef = useRef(null);
    const initialListRef = useRef([{ id: 'n1', data: 10 }, { id: 'n2', data: 20 }]);

    // Prepare the algorithm but don't run it yet
    const loadAlgorithm = () => {
        const val = parseInt(inputValue);
        if (algoSlug === 'll-insert' && isNaN(val)) {
            alert("Please enter a valid number");
            return;
        }
        
        // Save current state for the Reset button
        initialListRef.current = [...listNodes];
        
        const gen = algoSlug === 'll-insert' ? insertNode(listNodes, val) : deleteNode(listNodes);
        generatorRef.current = gen;
        
        // Yield the very first "Ready" state to the UI
        const firstFrame = { nodes: listNodes, action: 'READY', step: 0, codeLine: 1 };
        onStateChange(firstFrame);
    };

    const advanceStep = () => {
        if (!generatorRef.current) return false;
        const next = generatorRef.current.next();
        if (!next.done) {
            if (next.value.nodes) setListNodes(next.value.nodes);
            onStateChange(next.value);
            return true;
        }
        return false;
    };

    useEffect(() => {
        controls.current = { 
            advanceStep,
            reset: () => {
                setListNodes(initialListRef.current);
                generatorRef.current = null;
                onStateChange({ action: 'RESET', step: 0, codeLine: 1 });
            }
        };
    }, [listNodes]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const g = svg.append("g").attr("transform", "translate(70, 150)");

        svg.append("defs").append("marker")
            .attr("id", "arrowhead").attr("viewBox", "0 -5 10 10").attr("refX", 8) 
            .attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto")
            .append("path").attr("d", "M0,-5L10,0L0,5").attr("fill", "#6366f1");

        const nodes = g.selectAll(".node-container").data(listNodes, d => d.id);
        const enterGroups = nodes.enter().append("g")
            .attr("class", "node-container")
            .attr("transform", (d, i) => `translate(${i * 150}, 0)`);

        enterGroups.append("circle").attr("r", 35).attr("fill", "#6366f1").attr("stroke", "#fff").attr("stroke-width", 3);
        enterGroups.append("text").attr("text-anchor", "middle").attr("dy", "0.35em").attr("fill", "white").style("font-weight", "900").text(d => d.data);
        
        enterGroups.append("line").attr("x1", 35).attr("y1", 0).attr("x2", 110).attr("y2", 0).attr("stroke", "#6366f1").attr("stroke-width", 4).attr("marker-end", "url(#arrowhead)")
            .style("opacity", (d, i) => i === listNodes.length - 1 ? 0 : 1);

        nodes.exit().transition().duration(speed).style("opacity", 0).remove();
    }, [listNodes, speed]);

    return (
        <div className="flex flex-col h-full p-8 bg-white rounded-xl shadow-inner border border-gray-200">
            <div className="flex gap-4 mb-10 bg-gray-50 p-4 rounded-2xl items-center border border-gray-200">
                <input 
                    type="number" value={inputValue} 
                    onChange={e => setInputValue(e.target.value)} 
                    className="p-3 border rounded-xl text-indigo-600 font-black w-32" 
                    placeholder="Value" 
                />
                <button 
                    onClick={loadAlgorithm} 
                    className="bg-indigo-600 px-8 py-3 rounded-xl text-white font-black hover:bg-indigo-700 transition shadow-lg"
                >
                    {algoSlug === 'll-insert' ? 'Load Insertion' : 'Load Deletion'}
                </button>
                <p className="text-gray-400 text-xs italic ml-4 italic">
                    Click "{algoSlug.includes('insert') ? 'Load' : 'Load'}" then use bottom controls to Play/Step
                </p>
            </div>
            <div className="flex-1 flex items-center justify-center border-4 border-dashed border-gray-50 rounded-3xl">
                <svg ref={svgRef} width="100%" height="300" preserveAspectRatio="xMidYMid meet" />
            </div>
        </div>
    );
};
export default LinkedListVisualizer;