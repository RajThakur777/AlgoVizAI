// src/algorithms/heapLogic.js

export function* heapInsert(initialArray, newValue, type = 'min') {
    let arr = [...initialArray];
    let step = 0;
    
    // Step 1: Add to end
    arr.push(newValue);
    let index = arr.length - 1;
    yield { array: [...arr], highlights: [index], action: 'PUSH_END', codeLine: 2, step: step++ };

    // Step 2: Bubble Up
    while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        yield { array: [...arr], highlights: [index, parentIndex], action: 'COMPARE', codeLine: 4, step: step++ };

        const condition = type === 'min' 
            ? arr[index] < arr[parentIndex] 
            : arr[index] > arr[parentIndex];

        if (condition) {
            [arr[index], arr[parentIndex]] = [arr[parentIndex], arr[index]];
            yield { array: [...arr], highlights: [index, parentIndex], action: 'SWAP', codeLine: 5, step: step++ };
            index = parentIndex;
        } else {
            break;
        }
    }
    yield { array: [...arr], highlights: [], action: 'FINISHED', codeLine: 8, step: step++ };
}