// src/algorithms/slidingWindow.js

/**
 * Fixed Size: Find maximum sum of any contiguous subarray of size K.
 */
export function* fixedSlidingWindow(arr, k) {
    let currentSum = 0;
    let step = 0;

    // Phase 1: Initial Window Construction
    for (let i = 0; i < k; i++) {
        currentSum += arr[i];
        yield { 
            action: 'INITIAL_WINDOW', array: arr, 
            window: [0, i], currentSum, maxSum: currentSum, 
            addingIdx: i, removingIdx: null, codeLine: 3, step: step++ 
        };
    }

    let maxSum = currentSum;

    // Phase 2: Sliding/Shifting
    for (let i = k; i < arr.length; i++) {
        const removedVal = arr[i - k];
        const addedVal = arr[i];
        currentSum = currentSum - removedVal + addedVal;
        maxSum = Math.max(maxSum, currentSum);

        yield { 
            action: 'SLIDING', array: arr, 
            window: [i - k + 1, i], currentSum, maxSum, 
            addingIdx: i, removingIdx: i - k, codeLine: 4, step: step++ 
        };
    }
}

/**
 * Variable Size: Find smallest subarray with sum >= target K.
 */
export function* variableSlidingWindow(arr, target) {
    let currentSum = 0;
    let left = 0;
    let minLen = Infinity;
    let step = 0;

    for (let right = 0; right < arr.length; right++) {
        currentSum += arr[right];
        yield { 
            action: 'EXPANDING', array: arr, window: [left, right], 
            currentSum, minLen, addingIdx: right, removingIdx: null, codeLine: 2, step: step++ 
        };

        while (currentSum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            yield { 
                action: 'SHRINKING', array: arr, window: [left, right], 
                currentSum, minLen, addingIdx: null, removingIdx: left, codeLine: 4, step: step++ 
            };
            currentSum -= arr[left];
            left++;
        }
    }
}