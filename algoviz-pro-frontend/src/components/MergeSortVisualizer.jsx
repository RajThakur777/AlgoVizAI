import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { mergeSortVisual } from '../algorithms/mergeSortLogic';

const MergeSortVisualizer = ({ onStateChange, controls, speed }) => {
    const svgRef = useRef();
    const initialArr = [12, 5, 18, 9, 3, 15];
    const [elements, setElements] = useState([{ val: initialArr, level: 0, offset: 0 }]);
    const generatorRef = useRef(null);

    const init = () => {
        setElements([{ val: initialArr, level: 0, offset: 0 }]);
        generatorRef.current = mergeSortVisual(initialArr);
        onStateChange({ codeLine: 1, step: 0, action: 'READY' });
    };

    useEffect(() => {
        init();
        controls.current = {
            advanceStep: () => {
                const next = generatorRef.current.next();
                if (!next.done) {
                    processStep(next.value);
                    onStateChange(next.value);
                    return true;
                }
                return false;
            },
            reset: init
        };
    }, []);

    const processStep = (state) => {
        if (state.type === 'SPLIT') {
            setElements(prev => [
                ...prev,
                { val: state.left, level: state.level + 1, offset: state.offset },
                { val: state.right, level: state.level + 1, offset: state.offset + state.left.length }
            ]);
        } else if (state.type === 'MERGED') {
            setElements(prev => {
                const updated = prev.map(el => (el.level === state.level && el.offset === state.offset) ? { ...el, val: state.array, isMerged: true, isMerging: false } : el);
                return updated.filter(el => !(el.level === state.level + 1 && el.offset >= state.offset && el.offset < state.offset + state.array.length));
            });
        }
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Marker for merge/divide arrows
        svg.append("defs").append("marker")
            .attr("id", "mergeArrow").attr("viewBox", "0 -5 10 10").attr("refX", 5).attr("markerWidth", 4).attr("markerHeight", 4).attr("orient", "auto")
            .append("path").attr("d", "M0,-5L10,0L0,5").attr("fill", "#94a3b8");

        const g = svg.append("g").attr("transform", "translate(30, 30)");

        elements.forEach(group => {
            // 1. Draw DIVISION ARROWS linking parent to sub-arrays
            if (group.val.length > 1 && group.level < 2) {
                const x = group.offset * 38 + (group.val.length * 34) / 2;
                const y = group.level * 55 + 25;
                g.append("line").attr("x1", x).attr("y1", y).attr("x2", x - 30).attr("y2", y + 30).attr("stroke", "#cbd5e1").attr("marker-end", "url(#mergeArrow)");
                g.append("line").attr("x1", x).attr("y1", y).attr("x2", x + 30).attr("y2", y + 30).attr("stroke", "#cbd5e1").attr("marker-end", "url(#mergeArrow)");
            }

            const container = g.append("g").attr("transform", `translate(${group.offset * 38}, ${group.level * 55})`);
            
            group.val.forEach((v, i) => {
                // 2. TWO-POINTER HIGHLIGHT (Logic for i/j comparison)
                const isCurrentPointer = group.isMerging && (i === group.pointerI || i === group.pointerJ);
                
                container.append("rect").attr("x", i * 34).attr("width", 30).attr("height", 30).attr("rx", 5)
                    .attr("fill", isCurrentPointer ? "#f59e0b" : (group.isMerged ? "#4ade80" : "#6366f1"));
                
                container.append("text").attr("x", i * 34 + 15).attr("y", 19).attr("text-anchor", "middle").attr("fill", "white")
                    .style("font-size", "11px").style("font-weight", "bold").text(v);
            });
        });
    }, [elements]);

    return (
        <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
            <svg ref={svgRef} viewBox="0 0 500 320" preserveAspectRatio="xMidYMid meet" className="w-full h-full p-2" />
        </div>
    );
};
export default MergeSortVisualizer;