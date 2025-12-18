import axios from 'axios';
import API_BASE_URL from '../config/api';

const AI_URL = `${API_BASE_URL}/ai`;

export const getTutorResponse = async (promptData) => {
    // promptData should include userPrompt, algoSlug, currentVizState, and codeSnippets
    const response = await axios.post(`${AI_URL}/tutor`, promptData);
    return response.data.text;
};