import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { hashInsert } from '../algorithms/hashingLogic';

const HashingVisualizer = ({ algoSlug, onStateChange, controls, speed }) => {
    const svgRef = useRef();
    const [buckets, setBuckets] = useState(Array.from({ length: 8 }, () => []));
    const [inputKey, setInputKey] = useState("");
    const [inputVal, setInputVal] = useState("");
    const [error, setError] = useState(null);
    const [status, setStatus] = useState({ index: null, action: '' });
    const generatorRef = useRef(null);

    const isMap = algoSlug === 'hash-map';

    const handleAction = () => {
        if (!inputKey.trim()) return;
        setError(null);
        generatorRef.current = hashInsert(buckets, inputKey, isMap ? inputVal : null, isMap);
        advance();
    };

    const advance = () => {
        const next = generatorRef.current?.next();
        if (next && !next.done) {
            const val = next.value;
            if (val.action === 'ERROR_DUPLICATE') setError(val.message);
            if (val.buckets) setBuckets([...val.buckets]);
            setStatus({ index: val.index, action: val.action });
            onStateChange(val);
            return true;
        }
        return false;
    };

    useEffect(() => {
        controls.current = { 
            advanceStep: advance, 
            reset: () => {
                setBuckets(Array.from({ length: 8 }, () => []));
                setError(null);
                setStatus({ index: null, action: '' });
                onStateChange({ action: 'RESET', step: 0, codeLine: 1 });
            }
        };
    }, [buckets]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        
        // Dynamic height based on bucket count + padding
        const g = svg.append("g").attr("transform", "translate(40, 40)");

        buckets.forEach((chain, i) => {
            const bucketY = i * 65; // Increased vertical spacing
            const bucketG = g.append("g").attr("transform", `translate(0, ${bucketY})`);

            // Bucket Slot (Index Circle)
            bucketG.append("circle")
                .attr("cx", 25).attr("cy", 25).attr("r", 20)
                .attr("fill", status.index === i ? (status.action.includes('ERROR') ? "#fee2e2" : "#fef3c7") : "#f8fafc")
                .attr("stroke", status.index === i ? (status.action.includes('ERROR') ? "#ef4444" : "#f59e0b") : "#e2e8f0")
                .attr("stroke-width", 2);

            bucketG.append("text").attr("x", 25).attr("y", 25).attr("text-anchor", "middle").attr("dy", ".35em")
                .attr("fill", "#94a3b8").style("font-size", "12px").style("font-weight", "bold").text(i);

            // Chain Nodes
            chain.forEach((item, j) => {
                const nodeX = 100 + (j * 170); // Increased horizontal spacing for visibility
                const nodeG = bucketG.append("g").attr("transform", `translate(${nodeX}, 0)`);

                // Connection line (Dashed)
                bucketG.append("line")
                    .attr("x1", nodeX - 55).attr("y1", 25).attr("x2", nodeX).attr("y2", 25)
                    .attr("stroke", "#cbd5e1").attr("stroke-width", 2).attr("stroke-dasharray", "4");

                // Key-Value Capsule
                nodeG.append("rect").attr("width", 150).attr("height", 50).attr("rx", 10).attr("fill", "#6366f1")
                    .style("filter", "drop-shadow(0 4px 6px rgba(0,0,0,0.1))");

                // Label Text: Key → Value or just Key
                const label = isMap ? `${item.key} → ${item.value}` : item.key;
                nodeG.append("text").attr("x", 75).attr("y", 25).attr("text-anchor", "middle").attr("dy", ".35em")
                    .attr("fill", "white").style("font-size", "14px").style("font-weight", "900").text(label);
            });
        });
    }, [buckets, status, isMap]);

    return (
        <div className="flex flex-col h-full w-full items-center p-6 bg-white relative">
            {/* ALERT BOX */}
            {error && (
                <div className="absolute top-4 z-50 animate-bounce bg-red-600 text-white px-8 py-3 rounded-2xl text-sm font-black shadow-2xl">
                    ⚠️ {error}
                </div>
            )}

            {/* INPUT PANEL */}
            <div className="flex gap-4 mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-200 items-end shadow-md">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase text-indigo-500 ml-1">Key / Value</label>
                    <input 
                        type="text" value={inputKey} onChange={e => setInputKey(e.target.value)} 
                        className="p-3 border-2 border-slate-200 rounded-xl w-40 font-bold text-slate-800 focus:border-indigo-500 outline-none" 
                        placeholder={isMap ? "Key" : "Element"} 
                    />
                </div>
                {isMap && (
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase text-indigo-500 ml-1">Map Value</label>
                        <input 
                            type="text" value={inputVal} onChange={e => setInputVal(e.target.value)} 
                            className="p-3 border-2 border-slate-200 rounded-xl w-40 font-bold text-slate-800 focus:border-indigo-500 outline-none" 
                            placeholder="Value" 
                        />
                    </div>
                )}
                <button 
                    onClick={handleAction} 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
                >
                    {isMap ? "Push to Map" : "Add to Set"}
                </button>
            </div>

            {/* SCROLLABLE VISUALIZATION AREA */}
            <div className="flex-1 w-full overflow-auto custom-scrollbar bg-slate-50/20 rounded-3xl p-8 border-2 border-dashed border-slate-100">
                <svg ref={svgRef} width="1500" height="600" viewBox="0 0 1500 600" />
            </div>
        </div>
    );
};

export default HashingVisualizer;