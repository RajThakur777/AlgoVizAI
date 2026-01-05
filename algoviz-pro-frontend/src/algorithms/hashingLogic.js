// src/algorithms/hashingLogic.js

export function* hashInsert(currentBuckets, key, value = null, isMap = true) {
    let stepCount = 0;
    const bucketSize = currentBuckets.length;
    
    // Step 1: Compute Hash & Index
    const hash = typeof key === 'number' ? key : String(key).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const index = hash % bucketSize;
    yield { action: 'CALC_INDEX', key, hash, index, codeLine: 3, step: stepCount++ };

    // Step 2: Uniqueness Check (Strictly for HashSet)
    if (!isMap) {
        const alreadyExists = currentBuckets[index].some(item => item.key === key);
        if (alreadyExists) {
            yield { 
                action: 'ERROR_DUPLICATE', 
                message: `Value "${key}" is already in the Set.`,
                index, 
                codeLine: 4, 
                step: stepCount++ 
            };
            return; // Terminate insertion
        }
    }

    // Step 3: Finalize Insertion
    const newBuckets = [...currentBuckets];
    const entry = isMap ? { key, value } : { key };
    newBuckets[index] = [...newBuckets[index], entry];
    
    yield { 
        buckets: newBuckets, 
        action: 'INSERT', 
        index, 
        codeLine: isMap ? 4 : 5, 
        step: stepCount++ 
    };
}