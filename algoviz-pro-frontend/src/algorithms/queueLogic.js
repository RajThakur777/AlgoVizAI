export function* enqueueLogic(currentQueue, newValue) {
    let stepCount = 0;
    const newItem = { id: `q-${Date.now()}`, data: newValue };
    
    // Step 1: Initialize element (Line 2 in Code Panel)
    yield { items: currentQueue, highlights: [], action: 'PREPARE_ENQUEUE', codeLine: 2, step: stepCount++ };
    
    // Step 2: Push to Rear (Line 3)
    const newQueue = [...currentQueue, newItem];
    yield { items: newQueue, highlights: [newItem.id], action: 'ENQUEUE_REAR', codeLine: 3, step: stepCount++ };
}

export function* dequeueLogic(currentQueue) {
    let stepCount = 0;
    if (currentQueue.length === 0) return;

    const frontId = currentQueue[0].id;
    // Step 1: Identify Front (Line 7)
    yield { items: currentQueue, highlights: [frontId], action: 'PEEK_FRONT', codeLine: 7, step: stepCount++ };
    
    // Step 2: Remove from Front (Line 8)
    const newQueue = currentQueue.slice(1);
    yield { items: newQueue, highlights: [], action: 'DEQUEUE_FRONT', codeLine: 8, step: stepCount++ };
}

export function* peekFrontLogic(currentQueue) {
    let stepCount = 0;
    if (currentQueue.length === 0) return;

    const frontId = currentQueue[0].id;
    // Highlight the front element with specialized styling
    yield { items: currentQueue, highlights: [frontId], action: 'PEEKING', codeLine: 12, step: stepCount++ };
}