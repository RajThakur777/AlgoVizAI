export function* linearSearch(array, target) {
    let stepCount = 0;
    yield { array, highlights: [], action: 'START', codeLine: 1, step: stepCount++, found: false };

    for (let i = 0; i < array.length; i++) {
        yield { array, highlights: [i], action: 'CHECKING', codeLine: 3, step: stepCount++, found: false };
        if (array[i] === target) {
            yield { array, highlights: [i], action: 'FOUND', codeLine: 4, step: stepCount++, found: true };
            return;
        }
    }
    yield { array, highlights: [], action: 'NOT_FOUND', codeLine: -1, step: stepCount++, found: false };
}

export function* binarySearch(array, target) {
    let stepCount = 0;
    const sortedArray = [...array].sort((a, b) => a - b);
    yield { array: sortedArray, highlights: [], action: 'START', codeLine: 1, step: stepCount++, found: false };

    let low = 0, high = sortedArray.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        yield { array: sortedArray, highlights: [mid], range: [low, high], action: 'CHECK_MID', codeLine: 4, step: stepCount++, found: false };

        if (sortedArray[mid] === target) {
            yield { array: sortedArray, highlights: [mid], action: 'FOUND', codeLine: 5, step: stepCount++, found: true };
            return;
        }
        if (sortedArray[mid] < target) {
            low = mid + 1;
            yield { array: sortedArray, highlights: [], range: [low, high], action: 'SEARCH_RIGHT', codeLine: 7, step: stepCount++, found: false };
        } else {
            high = mid - 1;
            yield { array: sortedArray, highlights: [], range: [low, high], action: 'SEARCH_LEFT', codeLine: 8, step: stepCount++, found: false };
        }
    }
    yield { array: sortedArray, highlights: [], action: 'NOT_FOUND', codeLine: -1, step: stepCount++, found: false };
}