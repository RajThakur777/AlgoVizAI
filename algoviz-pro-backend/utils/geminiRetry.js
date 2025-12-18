// algoviz-pro-backend/utils/geminiRetry.js

/**
 * Retries a function (Gemini API call) with exponential backoff on 503/UNAVAILABLE errors.
 * @param {function} apiCall - The function that performs the Gemini API call.
 * @param {number} maxRetries - Maximum number of retries.
 * @param {number} baseDelayMs - Initial delay in milliseconds (will double each retry).
 * @returns {Promise<any>} The successful response from the API call.
 */
async function geminiCallWithRetry(apiCall, maxRetries = 4, baseDelayMs = 1000) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            // Attempt the Gemini API call
            const result = await apiCall();
            return result; // Success! Return the result.
        } catch (error) {
            // Check specifically for the 503 UNAVAILABLE error
            const isServiceUnavailable = error.status === 503 || error.message.includes("UNAVAILABLE");

            if (isServiceUnavailable && attempt < maxRetries - 1) {
                // Calculate exponential backoff delay (2^attempt * baseDelayMs) with jitter
                const backoff = baseDelayMs * Math.pow(2, attempt);
                const jitter = Math.random() * 500; // Add up to 500ms of random jitter
                const delay = backoff + jitter;

                console.warn(`Gemini API: Attempt ${attempt + 1} failed (503 UNAVAILABLE). Retrying in ${delay.toFixed(0)}ms...`);
                
                // Wait for the calculated delay
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                // If it's a fatal error (400, 401, 429, etc.) or max retries reached, throw the error
                throw error;
            }
        }
    }
}

module.exports = { geminiCallWithRetry };