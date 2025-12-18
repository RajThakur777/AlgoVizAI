import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { linearSearch, binarySearch } from '../algorithms/searching';

const SearchingVisualizer = ({ algoSlug, speed, onStateChange, controls }) => {
    const svgRef = useRef();
    const [visualArray, setVisualArray] = useState([5, 12, 18, 25, 33, 40, 48, 55]);
    const [target, setTarget] = useState(33);
    const [currentState, setCurrentState] = useState(null);
    const generatorRef = useRef(null);

    const init = (slug, arr, t) => {
        const genMap = { 'linear-search': linearSearch, 'binary-search': binarySearch };
        const data = [...arr];
        if (slug === 'binary-search') data.sort((a, b) => a - b);
        
        generatorRef.current = (genMap[slug] || linearSearch)(data, t);
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
            reset: () => init(algoSlug, visualArray, target),
            visualArray // For ControlBar access
        };
    }, [visualArray, target, algoSlug, onStateChange]);

    useEffect(() => { init(algoSlug, visualArray, target); }, [algoSlug]);

    useEffect(() => {
        if (!currentState) return;
        const svg = d3.select(svgRef.current);
        const g = svg.select('g.chart-content');
        const height = 300, width = 550;

        const xScale = d3.scaleBand().domain(d3.range(currentState.array.length)).range([0, width]).padding(0.1);
        const yScale = d3.scaleLinear().domain([0, d3.max(currentState.array)]).range([height, 0]);

        const bars = g.selectAll(".bar-group").data(currentState.array, (d, i) => i);
        const enter = bars.enter().append("g").attr("class", "bar-group");
        
        enter.append("rect").attr("class", "bar").attr("width", xScale.bandwidth()).attr("y", height);
        enter.append("text").attr("class", "bar-label").attr("x", xScale.bandwidth() / 2).attr("dy", "-0.5em").attr("text-anchor", "middle");

        bars.merge(enter).transition().duration(speed * 0.8)
            .attr("transform", (d, i) => `translate(${xScale(i)}, 0)`)
            .select(".bar").attr("y", d => yScale(d)).attr("height", d => height - yScale(d))
            .attr("fill", (d, i) => {
                if (currentState.found && currentState.highlights.includes(i)) return '#4ade80'; // Found (Green)
                if (currentState.highlights.includes(i)) return '#facc15'; // Checking (Yellow)
                
                // Dim elements outside search range in Binary Search
                if (currentState.range) {
                    const [low, high] = currentState.range;
                    if (i < low || i > high) return '#e2e8f0'; // Dimmed
                }
                return '#6366f1'; // Default Indigo
            });

        bars.merge(enter).select(".bar-label").text(d => d).attr("y", d => yScale(d)).attr("fill", "#374151");
        bars.exit().remove();
    }, [currentState, speed]);

    return (
        <div className="flex flex-col h-full p-6 bg-white rounded-lg border border-gray-200 shadow-inner">
            <div className="flex space-x-4 mb-6 bg-gray-100 p-3 rounded-lg items-center">
                <div className="flex flex-col flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1">Target Element</label>
                    <input type="number" value={target} onChange={e => setTarget(parseInt(e.target.value))} className="p-2 border rounded font-mono text-indigo-600 font-bold" />
                </div>
                <button onClick={() => init(algoSlug, visualArray, target)} className="bg-indigo-600 px-6 py-2 rounded-lg text-white font-bold h-10 mt-5">Load Search</button>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <svg ref={svgRef} width="550" height="300" viewBox="0 0 550 300"><g className="chart-content"></g></svg>
            </div>
        </div>
    );
};
export default SearchingVisualizer;