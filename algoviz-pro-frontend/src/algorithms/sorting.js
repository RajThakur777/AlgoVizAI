// --- Bubble Sort ---
export function* bubbleSort(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    let stepCount = 0;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            // STEP: Comparing
            yield { step: stepCount++, array: [...arr], highlights: [j, j + 1], action: 'COMPARE', codeLine: 3 };
            
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                // STEP: Swapping
                yield { step: stepCount++, array: [...arr], highlights: [j, j + 1], action: 'SWAP', codeLine: 5 };
            }
        }
    }
    yield { step: stepCount++, array: [...arr], highlights: [], action: 'FINISHED', codeLine: -1 };
}

// --- Selection Sort ---
export function* selectionSort(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    let stepCount = 0;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        yield { step: stepCount++, array: [...arr], highlights: [i], action: 'MIN_INIT', codeLine: 3, sortedIndex: i };
        for (let j = i + 1; j < n; j++) {
            yield { step: stepCount++, array: [...arr], highlights: [j, minIdx], action: 'COMPARE', codeLine: 5, sortedIndex: i };
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                yield { step: stepCount++, array: [...arr], highlights: [minIdx], action: 'MIN_UPDATE', codeLine: 6, sortedIndex: i };
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        yield { step: stepCount++, array: [...arr], highlights: [i, minIdx], action: 'SWAP', codeLine: 8, sortedIndex: i };
    }
    yield { step: stepCount++, array: [...arr], highlights: [], action: 'FINISHED', codeLine: -1, sortedIndex: n };
}

// --- Insertion Sort ---
export function* insertionSort(initialArray) {
    const arr = [...initialArray];
    let stepCount = 0;
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        yield { step: stepCount++, array: [...arr], highlights: [i], action: 'PICK_KEY', codeLine: 3 };
        while (j >= 0 && arr[j] > key) {
            yield { step: stepCount++, array: [...arr], highlights: [j, j + 1], action: 'COMPARE', codeLine: 4 };
            arr[j + 1] = arr[j];
            j--;
            yield { step: stepCount++, array: [...arr], highlights: [j + 1], action: 'SHIFT', codeLine: 5 };
        }
        arr[j + 1] = key;
        yield { step: stepCount++, array: [...arr], highlights: [j + 1], action: 'INSERT', codeLine: 8 };
    }
    yield { step: stepCount++, array: [...arr], highlights: [], action: 'FINISHED', codeLine: -1 };
}

// --- Quick Sort ---
export function* quickSort(initialArray) {
    const arr = [...initialArray];
    let stepCount = 0;
    function* partition(low, high) {
        let pivot = arr[high];
        let i = low - 1;
        yield { step: stepCount++, array: [...arr], highlights: [high], action: 'PIVOT', codeLine: 9 };
        for (let j = low; j < high; j++) {
            yield { step: stepCount++, array: [...arr], highlights: [j, high], action: 'COMPARE', codeLine: 10 };
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                yield { step: stepCount++, array: [...arr], highlights: [i, j], action: 'SWAP', codeLine: 12 };
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        yield { step: stepCount++, array: [...arr], highlights: [i + 1, high], action: 'FINAL_SWAP', codeLine: 15 };
        return i + 1;
    }
    function* sort(low, high) {
        if (low < high) {
            let p = yield* partition(low, high);
            yield* sort(low, p - 1);
            yield* sort(p + 1, high);
        }
    }
    yield* sort(0, arr.length - 1);
    yield { step: stepCount++, array: [...arr], highlights: [], action: 'FINISHED', codeLine: -1 };
}
