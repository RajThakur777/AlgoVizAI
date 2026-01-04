// src/algorithms/graphLogic.js

// --- Graph BFS (Breadth-First Search) ---
// Maps to CodePanel: 1. function BFS, 4. while loop, 5. shift, 7. push
export function* graphBFS(nodes, adjList, startNode = 0) {
    let visited = new Set();
    let queue = [startNode];
    let step = 0;

    // Line 1 & 2: Initialization
    yield { items: [...queue], visited: [], currentNode: null, action: 'INIT_BFS', codeLine: 1, step: step++ };
    visited.add(startNode);

    while (queue.length > 0) {
        // Line 4: while (queue.length > 0) - Highlight loop check
        yield { items: [...queue], visited: Array.from(visited), action: 'CHECK_QUEUE', codeLine: 4, step: step++ };
        
        // Line 5: node = queue.shift()
        let current = queue.shift();
        yield { items: [...queue], visited: Array.from(visited), currentNode: current, action: 'VISIT_NODE', codeLine: 5, step: step++ };

        for (let neighborObj of adjList[current] || []) {
            let neighbor = neighborObj.node;
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor); // Line 7: queue.push(...node.children)
                yield { items: [...queue], visited: Array.from(visited), currentNode: current, action: 'PUSH_QUEUE', codeLine: 7, step: step++ };
            }
        }
    }
    // Line 10: End of function
    yield { items: [], visited: Array.from(visited), action: 'COMPLETE', codeLine: 10, step: step++ };
}

// --- Graph DFS (Depth-First Search) ---
// Maps to CodePanel: 1. function DFS, 2. visit, 4. DFS(child)
export function* graphDFS(nodes, adjList, startNode = 0) {
    let visited = new Set();
    let stack = [startNode];
    let step = 0;

    // Line 1: Function entry
    yield { items: [...stack], visited: [], action: 'INIT_DFS', codeLine: 1, step: step++ };

    while (stack.length > 0) {
        let current = stack.pop();

        if (!visited.has(current)) {
            visited.add(current); // Line 2: visit(node)
            yield { items: [...stack], visited: Array.from(visited), currentNode: current, action: 'VISIT_NODE', codeLine: 2, step: step++ };

            const neighbors = adjList[current] || [];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                let neighbor = neighbors[i].node;
                if (!visited.has(neighbor)) {
                    stack.push(neighbor); // Line 4: DFS(child) simulation
                    yield { items: [...stack], visited: Array.from(visited), currentNode: current, action: 'PUSH_STACK', codeLine: 4, step: step++ };
                }
            }
        }
    }
    yield { items: [], visited: Array.from(visited), action: 'COMPLETE', codeLine: 6, step: step++ };
}

export function* dijkstraLogic(nodes, adjList, startNode = 0, targetNode = 3) {
    let distances = {};
    let previous = {}; // Tracks the optimal path (parent node)
    let pq = []; 
    let visited = new Set();
    let step = 0;

    // 1. Initialization
    nodes.forEach(n => {
        distances[n.id] = Infinity;
        previous[n.id] = null;
    });
    distances[startNode] = 0;

    // Line 3: Enqueue start node
    pq.push({ id: startNode, d: 0 }); 

    yield { 
        items: [...pq], 
        visited: [], 
        distances: {...distances}, 
        previous: {...previous},
        source: startNode,
        target: targetNode,
        action: 'INIT', 
        codeLine: 3, 
        step: step++ 
    };

    while (pq.length > 0) {
        
        // Line 4: while (!pq.isEmpty()) { (Check loop condition)
        pq.sort((a, b) => a.d - b.d); 
        yield { items: [...pq], visited: Array.from(visited), distances: {...distances}, previous: {...previous}, action: 'CHECK_LOOP', codeLine: 4, step: step++ };
        
        let current = pq.shift(); // Line 5: Dequeue/Extract Min

        // Check if the extracted distance is already finalized (visited)
        if (visited.has(current.id)) {
            yield { items: [...pq], visited: Array.from(visited), distances: {...distances}, previous: {...previous}, action: 'SKIP_VISITED', codeLine: 5, step: step++ };
            continue; 
        }
        
        visited.add(current.id);

        // Yield state after extracting the minimum distance node
        yield { items: [...pq], visited: Array.from(visited), distances: {...distances}, previous: {...previous}, currentNode: current.id, action: 'EXTRACT_MIN', codeLine: 5, step: step++ };

        // Line 6: for (let edge of adj[node]) { (Start neighbor loop)
        yield { items: [...pq], visited: Array.from(visited), distances: {...distances}, previous: {...previous}, currentNode: current.id, action: 'START_NEIGHBORS', codeLine: 6, step: step++ };

        for (let neighbor of adjList[current.id] || []) {
            let newDist = distances[current.id] + neighbor.weight; // Line 7: Calculate new cost
            
            // Line 8: if (cost < dist[edge.to]) { (Relaxation check)
            if (newDist < distances[neighbor.id]) {
                distances[neighbor.id] = newDist;
                previous[neighbor.id] = current.id; // Record path

                // Update PQ: Remove old entry and push new lower-distance entry
                // Note: In a true heap-based PQ, this would be an O(log N) update. 
                // We use filter/push here for O(N) visualization simplicity.
                pq = pq.filter(item => item.id !== neighbor.node); 
                pq.push({ id: neighbor.node, d: newDist }); // Line 9: Enqueue/Update priority

                // Yield the new state after relaxation/update
                yield { items: [...pq], visited: Array.from(visited), distances: {...distances}, previous: {...previous}, currentNode: current.id, action: 'RELAX_UPDATE', codeLine: 9, step: step++ };
            } else {
                 // Yield state when relaxation check fails (for visual clarity)
                yield { items: [...pq], visited: Array.from(visited), distances: {...distances}, previous: {...previous}, currentNode: current.id, action: 'RELAX_SKIP', codeLine: 8, step: step++ };
            }
        }
        
        // Line 11: End of neighbor loop '}' 
        yield { items: [...pq], visited: Array.from(visited), distances: {...distances}, previous: {...previous}, action: 'END_ITERATION', codeLine: 11, step: step++ };
    }
    
    // Line 12/13: Final state
    yield { items: [], visited: Array.from(visited), distances: {...distances}, previous: {...previous}, action: 'COMPLETE', codeLine: 13, step: step++ };
}

// Kruskal's Algorithm Logic (MST)
export function* kruskalLogic(nodes, edges) {
    let sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    let mstEdges = [];
    let parent = {}; // DSU structure
    let rank = {};
    let step = 0;

    // Helper functions for DSU
    const find = (i) => {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    };
    const union = (i, j) => {
        let rootI = find(i);
        let rootJ = find(j);
        if (rootI !== rootJ) {
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
            return true; // Union successful
        }
        return false; // Cycle detected
    };

    // Initialize DSU
    nodes.forEach(n => { parent[n.id] = n.id; rank[n.id] = 0; });
    
    yield { remainingEdges: [...sortedEdges], mstEdges: [...mstEdges], parent: { ...parent }, action: 'INIT_DSU', codeLine: 1, step: step++ };

    for (let i = 0; i < sortedEdges.length; i++) {
        const edge = sortedEdges[i];
        
        let remainingEdges = sortedEdges.slice(i + 1);

        yield { remainingEdges: remainingEdges, currentEdge: edge, mstEdges: [...mstEdges], parent: { ...parent }, action: 'CHECK_EDGE', codeLine: 3, step: step++ };
        
        if (find(edge.u) !== find(edge.v)) {
            union(edge.u, edge.v);
            mstEdges.push(edge);
            yield { remainingEdges: remainingEdges, currentEdge: edge, mstEdges: [...mstEdges], parent: { ...parent }, action: 'UNION_ADD', codeLine: 6, step: step++ };
        } else {
            yield { remainingEdges: remainingEdges, currentEdge: edge, mstEdges: [...mstEdges], parent: { ...parent }, action: 'REJECT_CYCLE', codeLine: 8, step: step++ };
        }
    }
    
    // FINAL STATE: Explicitly yield the finished state with an empty queue
    yield { remainingEdges: [], mstEdges: [...mstEdges], parent: { ...parent }, action: 'COMPLETE', codeLine: 10, step: step++ };
}