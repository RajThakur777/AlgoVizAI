export function* insertNode(currentNodes, newValue) {
    let stepCount = 0;
    const newNode = { id: `node-${Date.now()}`, data: newValue };
    
    // Step 1: Create Node in memory
    yield { nodes: [newNode, ...currentNodes], highlights: [newNode.id], action: 'CREATE_NODE', codeLine: 2, step: stepCount++ };
    
    // Step 2: Link newNode.next to current head
    yield { nodes: [newNode, ...currentNodes], highlights: [newNode.id], action: 'LINK_NEXT', codeLine: 3, step: stepCount++ };
    
    // Step 3: Update head pointer to newNode
    yield { nodes: [newNode, ...currentNodes], highlights: [], action: 'UPDATE_HEAD', codeLine: 4, step: stepCount++ };
}

export function* deleteNode(currentNodes) {
    let stepCount = 0;
    if (currentNodes.length === 0) return;
    const targetId = currentNodes[0].id;
    
    yield { nodes: currentNodes, highlights: [targetId], action: 'TEMP_HEAD', codeLine: 2, step: stepCount++ };
    
    const remainingNodes = currentNodes.slice(1);
    yield { nodes: remainingNodes, highlights: [], action: 'MOVE_HEAD', codeLine: 4, step: stepCount++ };
}