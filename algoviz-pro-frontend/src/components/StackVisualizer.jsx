import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { pushLogic, popLogic, peekLogic } from '../algorithms/stackLogic';

const StackVisualizer = ({ onStateChange, controls, currentVizState }) => {
    const svgRef = useRef();
    const [stackItems, setStackItems] = useState([{ id: 'n1', data: 10 }, { id: 'n2', data: 20 }]);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(null); 
    const generatorRef = useRef(null);

    const STACK_LIMIT = 5; 

    const loadOp = (type) => {
        setError(null);
        if (type === 'push') {
            const val = parseInt(inputValue);
            if (isNaN(val)) return;
            if (stackItems.length >= STACK_LIMIT) {
                setError("Stack Overflow: The bucket is full!");
                return;
            }
            generatorRef.current = pushLogic(stackItems, val);
        } else if (type === 'pop') {
            if (stackItems.length === 0) {
                setError("Stack Underflow: The bucket is empty!");
                return;
            }
            generatorRef.current = popLogic(stackItems);
        } else {
            if (stackItems.length === 0) {
                setError("Peek Error: No items to peek!");
                return;
            }
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
            reset: () => {
                setError(null);
                setStackItems([{ id: 'n1', data: 10 }, { id: 'n2', data: 20 }]);
            }
        };
    }, [stackItems, onStateChange]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const g = svg.append("g").attr("transform", "translate(140, 20)");

        // 1. Draw the Vertical Bucket Container
        g.append("path")
            .attr("d", "M 0,0 L 0,280 L 120,280 L 120,0")
            .attr("fill", "rgba(226, 232, 240, 0.1)")
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 6);

        // 2. Render Stack Items
        const items = g.selectAll(".stack-item")
            .data(stackItems, d => d.id);
        
        const enter = items.enter().append("g")
            .attr("class", "stack-item")
            .attr("transform", (d, i) => {
                // FIXED: Coordinate calculation targets the top item (index 0) dynamically
                const yPos = 225 - (stackItems.length - 1 - i) * 55;
                return `translate(10, ${yPos})`;
            });

        // 3. Rectangle Styling & Animation
        const rects = enter.append("rect")
            .attr("width", 100)
            .attr("height", 50)
            .attr("rx", 8)
            .attr("fill", (d, i) => {
                // Highlight top element during PEEK action
                if (i === 0 && currentVizState?.action === 'PEEKING') return "#1e1b4b"; 
                if (i === 0) return "#facc15"; 
                return "#6366f1";
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 2);

        // --- DYNAMIC PEEK POPUP ANIMATION ---
        if (currentVizState?.action === 'PEEKING') {
            g.select(".stack-item") // Select only the first group
                .transition()
                .duration(300)
                .attr("transform", (d) => {
                    const topY = 225 - (stackItems.length - 1) * 55;
                    return `translate(5, ${topY - 10}) scale(1.1)`; // Popup and Enlarge
                })
                .transition()
                .duration(300)
                .attr("transform", (d) => {
                    const topY = 225 - (stackItems.length - 1) * 55;
                    return `translate(10, ${topY}) scale(1)`; // Snap back
                });
        }

        enter.append("text")
            .attr("x", 50).attr("y", 25).attr("text-anchor", "middle").attr("dy", ".35em")
            .attr("fill", "white")
            .style("font-weight", (d, i) => (i === 0 && currentVizState?.action === 'PEEKING') ? "900" : "700")
            .style("font-size", (d, i) => (i === 0 && currentVizState?.action === 'PEEKING') ? "20px" : "16px")
            .text(d => d.data);

        // 4. FIXED: Dynamic TOP Pointer
        if (stackItems.length > 0) {
            // Formula finds the top rect's position: 225 - (total_items - 1) * 55
            const topY = 225 - (stackItems.length - 1) * 55;

            g.append("text")
                .attr("x", -15)
                .attr("y", topY + 25) // Center arrow vertically with the 50px rect
                .attr("text-anchor", "end")
                .attr("fill", "#facc15")
                .style("font-weight", "900")
                .style("font-size", "14px")
                .text("TOP →");
        }
    }, [stackItems, currentVizState]); 

    return (
        <div className="flex flex-col h-full items-center p-4 relative">
            {/* Alert Overlay for Overflow/Underflow */}
            {error && (
                <div className="absolute top-0 w-full flex justify-center z-10 animate-bounce">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-black shadow-xl border border-red-400">
                        {error}
                    </div>
                </div>
            )}

            <div className="flex gap-2 mb-6 bg-slate-50 p-4 rounded-2xl items-center border border-slate-200 w-full max-w-lg shadow-sm">
                <input 
                    type="number" 
                    value={inputValue} 
                    onChange={e => setInputValue(e.target.value)} 
                    className="p-3 border border-slate-300 rounded-xl text-indigo-700 font-black w-24 bg-white" 
                    placeholder="Val" 
                />
                <div className="flex gap-2 flex-1">
                    <button onClick={() => loadOp('push')} className="flex-1 bg-indigo-600 py-3 rounded-xl text-white font-black uppercase text-xs hover:bg-indigo-700 active:scale-95 transition-all">Push</button>
                    <button onClick={() => loadOp('pop')} className="flex-1 bg-rose-500 py-3 rounded-xl text-white font-black uppercase text-xs hover:bg-rose-600 active:scale-95 transition-all">Pop</button>
                    <button onClick={() => loadOp('peek')} className="flex-1 bg-amber-500 py-3 rounded-xl text-white font-black uppercase text-xs hover:bg-amber-600 active:scale-95 transition-all">Peek</button>
                </div>
            </div>
            
            <div className="flex-1 w-full flex justify-center items-center">
                <svg ref={svgRef} width="400" height="320" preserveAspectRatio="xMidYMid meet" />
            </div>
        </div>
    );
};

export default StackVisualizer;