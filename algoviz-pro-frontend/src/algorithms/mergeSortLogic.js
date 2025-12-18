export function* mergeSortVisual(array) {
    let stepCount = 0;

    function* sort(arr, level, offset) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        // Step: Splitting the array (Maps to Line 4 in Code Panel)
        yield { 
            type: 'SPLIT', 
            level, 
            offset, 
            left, 
            right, 
            codeLine: 4, 
            step: stepCount++,
            action: 'DIVIDE'
        };

        const sortedLeft = yield* sort(left, level + 1, offset);
        const sortedRight = yield* sort(right, level + 1, offset + mid);

        // Merging logic
        const merged = [];
        let i = 0, j = 0;
        while (i < sortedLeft.length && j < sortedRight.length) {
            // Step: Comparing and Merging (Maps to Line 11/12)
            if (sortedLeft[i] <= sortedRight[j]) merged.push(sortedLeft[i++]);
            else merged.push(sortedRight[j++]);
            
            yield { 
                type: 'MERGE_STEP', 
                merged: [...merged], 
                level, 
                offset, 
                codeLine: 12, 
                step: stepCount++,
                action: 'MERGING'
            };
        }
        const finalMerged = [...merged, ...sortedLeft.slice(i), ...sortedRight.slice(j)];
        
        // Step: Sub-array fully merged (Maps to Line 17)
        yield { 
            type: 'MERGED', 
            array: finalMerged, 
            level, 
            offset, 
            codeLine: 17, 
            step: stepCount++,
            action: 'MERGED'
        };
        
        return finalMerged;
    }

    yield* sort(array, 0, 0);
    yield { action: 'FINISHED', step: stepCount, codeLine: -1 };
}