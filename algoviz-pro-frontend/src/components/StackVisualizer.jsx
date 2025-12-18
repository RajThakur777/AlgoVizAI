import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { pushLogic, popLogic, peekLogic } from '../algorithms/stackLogic';

const StackVisualizer = ({ onStateChange, controls, currentVizState }) => {
    const svgRef = useRef();
    const [stackItems, setStackItems] = useState([{ id: 'n1', data: 10 }, { id: 'n2', data: 20 }]);
    const [inputValue, setInputValue] = useState("");
    const generatorRef = useRef(null);

    const loadOp = (type) => {
        if (type === 'push') {
            const val = parseInt(inputValue);
            if (isNaN(val)) return;
            generatorRef.current = pushLogic(stackItems, val);
        } else if (type === 'pop') {
            generatorRef.current = popLogic(stackItems);
        } else {
            generatorRef.current = peekLogic(stackItems);
        }
        const first = generatorRef.current.next().value;
        onStateChange(first);
    };

    useEffect(() => {
        controls.current = { 
            advanceStep: () => {
                const next = generatorRef.current?.next();
                if (next && !next.done) {
                    if (next.value.items) setStackItems(next.value.items);
                    onStateChange(next.value);
                    return true;
                }
                return false;
            },
            reset: () => setStackItems([{ id: 'n1', data: 10 }, { id: 'n2', data: 20 }])
        };
    }, [stackItems, onStateChange]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const g = svg.append("g").attr("transform", "translate(140, 20)");

        // Vertical Bucket Container
        g.append("path")
            .attr("d", "M 0,0 L 0,280 L 120,280 L 120,0")
            .attr("fill", "none").attr("stroke", "#e2e8f0").attr("stroke-width", 6);

        const items = g.selectAll(".stack-item").data(stackItems, d => d.id);
        const enter = items.enter().append("g")
            .attr("transform", (d, i) => `translate(10, ${225 - (stackItems.length - 1 - i) * 55})`);

        enter.append("rect")
            .attr("width", 100).attr("height", 50).attr("rx", 8)
            .attr("fill", (d, i) => {
                // FIXED: Special dark styling for Peek operation
                if (i === 0 && onStateChange?.action === 'PEEKING') return "#1e1b4b"; // Deep Dark Indigo
                if (i === 0) return "#facc15"; // Normal Top (Yellow)
                return "#6366f1"; // Default (Indigo)
            })
            .attr("stroke", "#fff").attr("stroke-width", 2);

        enter.append("text")
            .attr("x", 50).attr("y", 25).attr("text-anchor", "middle").attr("dy", ".35em")
            .attr("fill", "white")
            // FIXED: Bold text during peek
            .style("font-weight", (d, i) => (i === 0 && onStateChange?.action === 'PEEKING') ? "900" : "700")
            .style("font-size", (d, i) => (i === 0 && onStateChange?.action === 'PEEKING') ? "20px" : "16px")
            .text(d => d.data);

        if (stackItems.length > 0) {
            g.append("text").attr("x", -15).attr("y", 225 - (stackItems.length - 1) * 0 + 30)
                .attr("text-anchor", "end").attr("fill", "#facc15").style("font-weight", "bold").text("TOP →");
        }
    }, [stackItems, onStateChange?.action]); // Re-render when action changes

    return (
        <div className="flex flex-col h-full items-center p-4">
            <div className="flex gap-2 mb-6 bg-slate-50 p-4 rounded-2xl items-center border border-slate-200 w-full max-w-lg shadow-sm">
                <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} 
                    className="p-3 border border-slate-300 rounded-xl text-indigo-700 font-black w-24 bg-white" placeholder="Val" />
                <div className="flex gap-2 flex-1">
                    <button onClick={() => loadOp('push')} className="flex-1 bg-indigo-600 py-3 rounded-xl text-white font-black uppercase text-xs hover:bg-indigo-700 active:scale-95">Push</button>
                    <button onClick={() => loadOp('pop')} className="flex-1 bg-rose-500 py-3 rounded-xl text-white font-black uppercase text-xs hover:bg-rose-600 active:scale-95">Pop</button>
                    <button onClick={() => loadOp('peek')} className="flex-1 bg-amber-500 py-3 rounded-xl text-white font-black uppercase text-xs hover:bg-amber-600 active:scale-95">Peek</button>
                </div>
            </div>
            <div className="flex-1 w-full flex justify-center items-center">
                <svg ref={svgRef} width="400" height="320" preserveAspectRatio="xMidYMid meet" />
            </div>
        </div>
    );
};
export default StackVisualizer;