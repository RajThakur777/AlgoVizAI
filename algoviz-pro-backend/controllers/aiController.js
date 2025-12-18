// algoviz-pro-backend/controllers/aiController.js

const { GoogleGenAI } = require('@google/genai');
// IMPORTANT: You must create this file and export the function as shown previously.
const { geminiCallWithRetry } = require('../utils/geminiRetry'); 

// The SDK automatically picks up the GEMINI_API_KEY from the environment
const ai = new GoogleGenAI({}); 
const MODEL_NAME = 'gemini-2.5-flash';

// @desc    Generate AI response for the tutor
// @route   POST /api/ai/tutor
// @access  Public
const getAITutorResponse = async (req, res) => {
    const { userPrompt, algoSlug, currentVizState, codeSnippets } = req.body;

    // Construct a detailed system instruction for the AI tutor
    const systemInstruction = `
        You are an expert AI Pedagogical Tutor specializing in Data Structures and Algorithms. 
        Your goal is to provide helpful, context-aware answers based on the user's current visualization state.
        
        Algorithm: ${algoSlug.toUpperCase()}
        Current Step: ${currentVizState.step}
        Current Action: ${currentVizState.action}
        Code Line: ${currentVizState.codeLine}

        Code Snippet:
        ${codeSnippets.join('\n')}

        Respond directly to the user's prompt using the context above. Use Markdown for formatting.
        Keep explanations brief and focus on the visual representation of the current step.
    `;
    
    // Combine context and user prompt
    const prompt = `${systemInstruction}\n\nUser Question: ${userPrompt}`;

    try {
        // --- CRITICAL FIX: Integrate Retry Logic ---
        // We wrap the API call in an asynchronous function and pass it to the retry utility.
        const responseText = await geminiCallWithRetry(async () => {
            const result = await ai.models.generateContent({
                model: MODEL_NAME,
                contents: prompt,
            });
            return result.text;
        }, 5); // Attempt the call up to 5 times on 503 errors

        // Send the successful response text
        res.status(200).json({ 
            text: responseText 
        });

    } catch (error) {
        // This block executes if all retries fail or if a non-503 error occurred.
        console.error('Gemini API Error (Final Failure):', error.message);
        
        // Check if the error is a definitive API error status
        const statusCode = error.status || 500; 
        
        // Provide a clearer message if the failure was due to the overloaded model after retries
        const errorMessage = error.message.includes("after")
            ? error.message 
            : 'Failed to generate AI response. Please check your API key and input format.';

        res.status(statusCode).json({ message: errorMessage });
    }
};

module.exports = { getAITutorResponse };