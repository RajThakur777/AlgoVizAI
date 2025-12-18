import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { enqueueLogic, dequeueLogic, peekFrontLogic } from '../algorithms/queueLogic';

const QueueVisualizer = ({ onStateChange, controls }) => {
    const svgRef = useRef();
    const [queueItems, setQueueItems] = useState([{ id: 'q1', data: 10 }, { id: 'q2', data: 20 }]);
    const [inputValue, setInputValue] = useState("");
    const generatorRef = useRef(null);

    const loadOp = (type) => {
        if (type === 'enqueue') {
            const val = parseInt(inputValue);
            if (isNaN(val)) return;
            generatorRef.current = enqueueLogic(queueItems, val);
        } else if (type === 'dequeue') {
            generatorRef.current = dequeueLogic(queueItems);
        } else {
            generatorRef.current = peekFrontLogic(queueItems);
        }
        const first = generatorRef.current.next().value;
        onStateChange(first);
    };

    useEffect(() => {
        controls.current = { 
            advanceStep: () => {
                const next = generatorRef.current?.next();
                if (next && !next.done) {
                    if (next.value.items) setQueueItems(next.value.items);
                    onStateChange(next.value);
                    return true;
                }
                return false;
            },
            reset: () => setQueueItems([{ id: 'q1', data: 10 }, { id: 'q2', data: 20 }])
        };
    }, [queueItems, onStateChange]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const g = svg.append("g").attr("transform", "translate(50, 100)");

        // Draw Horizontal "Pipe" Container
        g.append("path")
            .attr("d", "M 0,0 L 500,0 M 0,80 L 500,80") // Two horizontal lines
            .attr("fill", "none").attr("stroke", "#e2e8f0").attr("stroke-width", 4);

        const items = g.selectAll(".queue-item").data(queueItems, d => d.id);
        const enter = items.enter().append("g")
            .attr("transform", (d, i) => `translate(${i * 110}, 10)`);

        enter.append("rect")
            .attr("width", 100).attr("height", 60).attr("rx", 8)
            .attr("fill", (d, i) => {
                if (i === 0 && onStateChange?.action === 'PEEKING') return "#1e1b4b"; // Peek styling
                if (i === 0) return "#4ade80"; // Front is Green
                if (i === queueItems.length - 1) return "#facc15"; // Rear is Yellow
                return "#6366f1"; // Default Indigo
            })
            .attr("stroke", "#fff").attr("stroke-width", 2);

        enter.append("text")
            .attr("x", 50).attr("y", 30).attr("text-anchor", "middle").attr("dy", ".35em")
            .attr("fill", "white")
            .style("font-weight", (d, i) => (i === 0 && onStateChange?.action === 'PEEKING') ? "900" : "700")
            .text(d => d.data);

        // Labels for Front and Rear
        if (queueItems.length > 0) {
            g.append("text").attr("x", 50).attr("y", -15).attr("text-anchor", "middle").attr("fill", "#4ade80").style("font-weight", "bold").text("FRONT");
            g.append("text").attr("x", (queueItems.length - 1) * 110 + 50).attr("y", -15).attr("text-anchor", "middle").attr("fill", "#facc15").style("font-weight", "bold").text("REAR");
        }
    }, [queueItems, onStateChange?.action]);

    return (
        <div className="flex flex-col h-full items-center p-4">
            <div className="flex gap-2 mb-6 bg-slate-50 p-4 rounded-2xl items-center border border-slate-200 w-full max-w-xl shadow-sm">
                <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} 
                    className="p-3 border border-slate-300 rounded-xl text-indigo-700 font-black w-24 bg-white" placeholder="Val" />
                <div className="flex gap-2 flex-1">
                    <button onClick={() => loadOp('enqueue')} className="flex-1 bg-indigo-600 py-3 rounded-xl text-white font-black uppercase text-xs hover:bg-indigo-700 active:scale-95">Enqueue</button>
                    <button onClick={() => loadOp('dequeue')} className="flex-1 bg-rose-500 py-3 rounded-xl text-white font-black uppercase text-xs hover:bg-rose-600 active:scale-95">Dequeue</button>
                    <button onClick={() => loadOp('peek')} className="flex-1 bg-amber-500 py-3 rounded-xl text-white font-black uppercase text-xs hover:bg-amber-600 active:scale-95">Front/Peek</button>
                </div>
            </div>
            <div className="flex-1 w-full flex justify-center items-center bg-white rounded-2xl p-4">
                <svg ref={svgRef} width="550" height="250" preserveAspectRatio="xMidYMid meet" />
            </div>
        </div>
    );
};
export default QueueVisualizer;