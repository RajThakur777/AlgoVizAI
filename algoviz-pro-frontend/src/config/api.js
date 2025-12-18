// Vite uses import.meta.env
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Fallback for safety
if (!API_BASE_URL) {
    console.error("VITE_API_URL is not defined. Ensure you have a .env file.");
}

export default API_BASE_URL;