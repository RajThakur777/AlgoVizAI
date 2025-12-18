export function* pushLogic(currentStack, newValue) {
    let stepCount = 0;
    const newItem = { id: `item-${Date.now()}`, data: newValue };
    yield { items: currentStack, highlights: [], action: 'PREPARE_PUSH', codeLine: 2, step: stepCount++ };
    const newStack = [newItem, ...currentStack];
    yield { items: newStack, highlights: [newItem.id], action: 'PUSH_TOP', codeLine: 3, step: stepCount++ };
}

export function* popLogic(currentStack) {
    let stepCount = 0;
    if (currentStack.length === 0) return;
    const topId = currentStack[0].id;
    yield { items: currentStack, highlights: [topId], action: 'PEEK_TOP', codeLine: 7, step: stepCount++ };
    const newStack = currentStack.slice(1);
    yield { items: newStack, highlights: [], action: 'POP_COMPLETE', codeLine: 8, step: stepCount++ };
}

export function* peekLogic(currentStack) {
    let stepCount = 0;
    if (currentStack.length === 0) {
        yield { items: [], highlights: [], action: 'EMPTY', codeLine: 11, step: stepCount++ };
        return;
    }
    const topId = currentStack[0].id;
    // Special action 'PEEKING' for specialized styling
    yield { 
        items: currentStack, 
        highlights: [topId], 
        action: 'PEEKING', 
        codeLine: 12, 
        step: stepCount++ 
    };
}