export const generateTreeData = () => ({
    id: 1, name: "10",
    children: [
        {
            id: 2, name: "5",
            children: [
                { id: 4, name: "2", children: [] },
                { id: 5, name: "8", children: [] }
            ]
        },
        {
            id: 3, name: "15",
            children: [
                { id: 6, name: "12", children: [] },
                { id: 7, name: "20", children: [] }
            ]
        }
    ]
});

export function* bfs(root) {
    let queue = [root];
    let visited = [];
    let stepCount = 0;
    while (queue.length > 0) {
        let node = queue.shift();
        visited.push(node.id);
        yield { visited: [...visited], current: node.id, action: 'VISIT', codeLine: 5, step: stepCount++ };
        for (let child of node.children) {
            queue.push(child);
        }
    }
}

export function* dfs(root) {
    let stack = [root];
    let visited = [];
    let stepCount = 0;
    while (stack.length > 0) {
        let node = stack.pop();
        visited.push(node.id);
        yield { visited: [...visited], current: node.id, action: 'VISIT', codeLine: 2, step: stepCount++ };
        // Reverse children for left-to-right DFS traversal
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i]);
        }
    }
}