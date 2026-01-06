// /src/components/CodePanel.jsx

import React from 'react';

// FIX APPLIED: Added 'export' keyword here to make ALGO_CODE_DATABASE a named export.
export const ALGO_CODE_DATABASE = {
    'bubble-sort': [
        { number: 1, text: 'function bubbleSort(arr) {' },
        { number: 2, text: '  for i from 0 to n-1:' },
        { number: 3, text: '    for j from 0 to n-i-1:' },
        { number: 4, text: '      if arr[j] > arr[j+1]:' },
        { number: 5, text: '        swap(arr[j], arr[j+1])' },
        { number: 9, text: '}' }
    ],
    'selection-sort': [
        { number: 1, text: 'function selectionSort(arr) {' },
        { number: 2, text: '  for i from 0 to n-1:' },
        { number: 3, text: '    min_idx = i' },
        { number: 4, text: '    for j from i+1 to n:' },
        { number: 5, text: '      if arr[j] < arr[min_idx]:' },
        { number: 6, text: '        min_idx = j' },
        { number: 8, text: '    swap(arr[i], arr[min_idx])' },
        { number: 10, text: '}' }
    ],
    'insertion-sort': [
        { number: 1, text: 'function insertionSort(arr) {' },
        { number: 2, text: '  for i from 1 to n:' },
        { number: 3, text: '    key = arr[i], j = i - 1' },
        { number: 4, text: '    while j >= 0 and arr[j] > key:' },
        { number: 5, text: '      arr[j + 1] = arr[j]' },
        { number: 6, text: '      j--' },
        { number: 8, text: '    arr[j + 1] = key' },
        { number: 10, text: '}' }
    ],
    'quick-sort': [
        { number: 1, text: 'function quickSort(arr, low, high) {' },
        { number: 2, text: '  if (low < high) {' },
        { number: 3, text: '    pi = partition(arr, low, high)' },
        { number: 8, text: 'partition(arr, low, high) {' },
        { number: 9, text: '  pivot = arr[high], i = low - 1' },
        { number: 10, text: '  for j from low to high-1:' },
        { number: 12, text: '    if arr[j] < pivot: swap(arr[++i], arr[j])' },
        { number: 15, text: '  swap(arr[i+1], arr[high])' },
        { number: 18, text: '}' }
    ],
    'merge-sort': [
        { number: 1, text: 'function mergeSort(arr, l, r) {' },
        { number: 6, text: '  merge(arr, l, m, r)' },
        { number: 9, text: 'merge(arr, l, m, r) {' },
        { number: 11, text: '  while i < n1 and j < n2:' },
        { number: 12, text: '    if L[i] <= R[j]: arr[k] = L[i++]' },
        { number: 13, text: '    else: arr[k] = R[j++]' },
        { number: 15, text: '  while i < n1: arr[k++] = L[i++]' },
        { number: 16, text: '  while j < n2: arr[k++] = R[j++]' },
        { number: 17, text: '}' }
    ],
    'bfs': [
        { number: 1, text: 'function BFS(root) {' },
        { number: 2, text: '  let queue = [root]' },
        { number: 4, text: '  while (queue.length > 0) {' },
        { number: 5, text: '    node = queue.shift()' },
        { number: 7, text: '    queue.push(...node.children)' },
        { number: 9, text: '  }' },
        { number: 10, text: '}' }
    ],
    'dfs': [
        { number: 1, text: 'function DFS(node) {' },
        { number: 2, text: '  visit(node)' },
        { number: 3, text: '  for (child of node.children) {' },
        { number: 4, text: '    DFS(child)' },
        { number: 5, text: '  }' },
        { number: 6, text: '}' }
    ],
    'linear-search': [
        { number: 1, text: 'function linearSearch(arr, target) {' },
        { number: 2, text: '  for i from 0 to n-1:' },
        { number: 3, text: '    if arr[i] === target:' },
        { number: 4, text: '      return i' },
        { number: 6, text: '  return -1' },
        { number: 7, text: '}' }
    ],
    'binary-search': [
        { number: 1, text: 'function binarySearch(arr, target) {' },
        { number: 2, text: '  low = 0, high = n-1' },
        { number: 3, text: '  while low <= high:' },
        { number: 4, text: '    mid = floor((low+high)/2)' },
        { number: 5, text: '    if arr[mid] === target: return mid' },
        { number: 7, text: '    if arr[mid] < target: low = mid + 1' },
        { number: 8, text: '    else: high = mid - 1' },
        { number: 10, text: '}' }
    ],
    'll-insert': [
        { number: 1, text: 'function insertHead(val) {' },
        { number: 2, text: '  newNode = new Node(val)' },
        { number: 3, text: '  newNode.next = head' },
        { number: 4, text: '  head = newNode' },
        { number: 5, text: '}' }
    ],
    'll-delete': [
        { number: 1, text: 'function deleteHead() {' },
        { number: 2, text: '  temp = head' },
        { number: 3, text: '  if (head == null) return' },
        { number: 4, text: '  head = head.next' },
        { number: 5, text: '}' }
    ],
    'stack': [
        { number: 1, text: 'class Stack {' },
        { number: 2, text: '  push(val) {' },
        { number: 3, text: '    this.items.unshift(val)' },
        { number: 4, text: '  }' },
        { number: 6, text: '  pop() {' },
        { number: 7, text: '    if(this.isEmpty()) return null' },
        { number: 8, text: '    return this.items.shift()' },
        { number: 9, text: '  }' },
        { number: 11, text: '  peek() {' },
        { number: 12, text: '    return this.items[0]' },
        { number: 13, text: '  }' },
        { number: 14, text: '}' }
    ],
    'queue': [
        { number: 1, text: 'class Queue {' },
        { number: 2, text: '  enqueue(val) {' },
        { number: 3, text: '    this.items.push(val)' },
        { number: 4, text: '  }' },
        { number: 6, text: '  dequeue() {' },
        { number: 7, text: '    if(this.isEmpty()) return null' },
        { number: 8, text: '    return this.items.shift()' },
        { number: 9, text: '  }' },
        { number: 11, text: '  peek() {' },
        { number: 12, text: '    return this.items[0]' },
        { number: 13, text: '  }' },
        { number: 14, text: '}' }
    ],
    'graph-bfs': [
        { number: 1, text: 'function graphBFS(adjList, startNode) {' },
        { number: 2, text: '  let visited = new Set([startNode])' },
        { number: 3, text: '  let queue = [startNode]' },
        { number: 4, text: '  while (queue.length > 0) {' },
        { number: 5, text: '    let node = queue.shift()' },
        { number: 6, text: '    for (let neighbor of adjList[node]) {' },
        { number: 7, text: '      if (!visited.has(neighbor)) {' },
        { number: 8, text: '        visited.add(neighbor)' },
        { number: 9, text: '        queue.push(neighbor)' },
        { number: 10, text: '      }' },
        { number: 11, text: '    }' },
        { number: 12, text: '  }' },
        { number: 13, text: '}' }
    ],
    'graph-dfs': [
        { number: 1, text: 'function graphDFS(adjList, startNode) {' },
        { number: 2, text: '  let visited = new Set()' },
        { number: 3, text: '  let stack = [startNode]' },
        { number: 4, text: '  while (stack.length > 0) {' },
        { number: 5, text: '    let node = stack.pop()' },
        { number: 6, text: '    if (!visited.has(node)) {' },
        { number: 7, text: '      visited.add(node)' },
        { number: 8, text: '      for (let neighbor of adjList[node]) {' },
        { number: 9, text: '        stack.push(neighbor)' },
        { number: 10, text: '      }' },
        { number: 11, text: '    }' },
        { number: 12, text: '  }' },
        { number: 13, text: '}' }
    ],
    'dijkstra': [
        { number: 1, text: 'function Dijkstra(graph, start) {' },
        { number: 2, text: '  let pq = new PriorityQueue();' },
        { number: 3, text: '  pq.enqueue(start, 0);' },
        { number: 4, text: '  while (!pq.isEmpty()) {' },
        { number: 5, text: '    let {node, d} = pq.dequeue_min();' },
        { number: 6, text: '    for (let edge of adj[node]) {' },
        { number: 7, text: '      let cost = d + edge.weight;' },
        { number: 8, text: '      if (cost < dist[edge.to]) {' },
        { number: 9, text: '        pq.update_priority(edge.to, cost);' },
        { number: 10, text: '      }' },
        { number: 11, text: '    }' },
        { number: 12, text: '  }' },
        { number: 13, text: '}' }
    ],
    'kruskal': [
        { number: 1, text: 'function Kruskal(edges) {' },
        { number: 2, text: '  edges.sort(byWeight)' },
        { number: 3, text: '  for (edge of sortedEdges) {' },
        { number: 4, text: '    if (find(edge.u) !== find(edge.v)) {' },
        { number: 5, text: '      union(edge.u, edge.v)' },
        { number: 6, text: '      MST.add(edge)' },
        { number: 8, text: '    } else {' },
        { number: 9, text: '      // Reject: Cycle detected' },
        { number: 10, text: '    }' },
        { number: 11, text: '  }' },
        { number: 13, text: 'function find(i) { ... }' },
        { number: 15, text: 'function union(i, j) { ... }' }
    ],
    // ADDED: MIN HEAP LOGIC
    'min-heap': [
        { number: 1, text: 'function insertMinHeap(val) {' },
        { number: 2, text: '  heap.push(val);' },
        { number: 3, text: '  let i = heap.length - 1;' },
        { number: 4, text: '  while (i > 0 && heap[i] < heap[parent(i)]) {' },
        { number: 5, text: '    swap(heap[i], heap[parent(i)]);' },
        { number: 6, text: '    i = parent(i);' },
        { number: 7, text: '  }' },
        { number: 8, text: '}' }
    ],
    // ADDED: MAX HEAP LOGIC
    'max-heap': [
        { number: 1, text: 'function insertMaxHeap(val) {' },
        { number: 2, text: '  heap.push(val);' },
        { number: 3, text: '  let i = heap.length - 1;' },
        { number: 4, text: '  while (i > 0 && heap[i] > heap[parent(i)]) {' },
        { number: 5, text: '    swap(heap[i], heap[parent(i)]);' },
        { number: 6, text: '    i = parent(i);' },
        { number: 7, text: '  }' },
        { number: 8, text: '}' }
    ],
    'priority-queue': [
        { number: 1, text: 'function insert(val) {' },
        { number: 2, text: '  heap.push(val);' },
        { number: 3, text: '  let i = heap.length - 1;' },
        { number: 4, text: '  while (i > 0 && heap[i] < heap[parent(i)]) {' },
        { number: 5, text: '    swap(heap[i], heap[parent(i)]);' },
        { number: 6, text: '    i = parent(i);' },
        { number: 7, text: '  }' },
        { number: 8, text: '}' }
    ],
    // Add to ALGO_CODE_DATABASE in CodePanel.jsx
    // src/components/CodePanel.jsx

'hash-map': [
    { number: 1, text: 'function put(key, value) {' },
    { number: 2, text: '  let hash = computeHash(key);' },
    { number: 3, text: '  let index = hash % bucketArray.length;' },
    { number: 4, text: '  bucketArray[index].add({key, value});' },
    { number: 5, text: '}' }
],
'hash-set': [
    { number: 1, text: 'function add(value) {' },
    { number: 2, text: '  let hash = computeHash(value);' },
    { number: 3, text: '  let index = hash % bucketArray.length;' },
    { number: 4, text: '  if (bucketArray[index].contains(value)) return;' },
    { number: 5, text: '  bucketArray[index].add(value);' },
    { number: 6, text: '}' }
],
'sliding-window-fixed': [
    { number: 1, text: 'function slidingWindow(arr, k) {' },
    { number: 2, text: '  let currentSum = arr.slice(0, k).sum();' },
    { number: 3, text: '  for (let i = k; i < n; i++) {' },
    { number: 4, text: '    currentSum += arr[i] - arr[i-k];' },
    { number: 5, text: '    maxSum = max(maxSum, currentSum);' },
    { number: 6, text: '  }' },
    { number: 7, text: '}' }
],
'sliding-window-variable': [
    { number: 1, text: 'while (right < arr.length) {' },
    { number: 2, text: '  currentSum += arr[right];' },
    { number: 3, text: '  while (currentSum >= K) {' },
    { number: 4, text: '    minLen = min(minLen, right - left + 1);' },
    { number: 5, text: '    currentSum -= arr[left++];' },
    { number: 6, text: '  }' },
    { number: 7, text: '}' }
],
};

const CodePanel = ({ highlightedLine, algoSlug }) => {
    // Selects code based on algoSlug, defaulting to bubble-sort
    const code = ALGO_CODE_DATABASE[algoSlug] || ALGO_CODE_DATABASE['bubble-sort'];

    return (
        <div className="flex flex-col h-full bg-slate-900/50 border border-indigo-500/20 shadow-2xl rounded-2xl overflow-hidden">
            <h2 className="px-6 py-4 text-lg font-bold text-indigo-400 uppercase tracking-widest border-b border-white/10 shrink-0">
                💻 {algoSlug?.replace('-', ' ')} Logic
            </h2>
            <div className="flex-1 overflow-y-auto p-4 bg-black/30 font-mono text-sm custom-scrollbar">
                <pre>
                    {code.map((line) => (
                        <div 
                            key={line.number} 
                            className={`py-1.5 transition-colors duration-200 ${line.number === highlightedLine ? 'bg-indigo-600/40 border-l-4 border-indigo-500 pl-2 text-white' : 'text-gray-400 pl-3'}`}
                        >
                            <span className="inline-block w-8 opacity-30 select-none text-xs">{line.number}</span>
                            {line.text}
                        </div>
                    ))}
                </pre>
            </div>
        </div>
    );
};

export default CodePanel;