🎓 AlgoVizAI : Interactive DSA Learning Engine
AlgoVizAI is a high-fidelity, full-stack web application designed to help students master Data Structures and Algorithms (DSA). By combining real-time, step-by-step visualizations with an AI-powered pedagogical tutor, it bridges the gap between static code and conceptual understanding.

🚀 Key Features
High-Fidelity Visualizations: Interactive, real-time rendering of sorting, searching, tree traversals, and graph algorithms.

AI Pedagogical Tutor: Integration with the Gemini 2.5 Flash model to provide context-aware hints, complexity analysis, and logic explanations based on the current visualization state.

Step-by-Step Traversal: Control the flow of the algorithm—pause, rewind, or adjust simulation speed to see exactly how data moves.

Live Code Highlighting: Synchronized logic display that highlights the specific line of code being executed in real-time.

Glassmorphism UI: A modern, responsive interface built with deep-space themes, layered blur effects, and smooth Framer Motion transitions.

Secure Authentication: Full user lifecycle management including registration, login, and protected routes for dashboards.

🛠️ Technical Stack
Frontend
React.js & Vite: For a fast, modular component architecture.

Tailwind CSS: Custom utility-first styling with advanced glassmorphism effects.

Framer Motion: Fluid layout transitions and interactive micro-animations.

React Router: Dynamic routing and protected dashboard access.

Backend
Node.js & Express: Scalable server-side logic and RESTful API design.

MongoDB: Persistent storage for user data and saved visualization states.

Google Gemini SDK: Powering the AI Tutor with generative AI capabilities.

CORS & Dotenv: Secure cross-origin resource sharing and environment management.

📦 Installation & Setup
Prerequisites
Node.js (v18+ recommended)

npm or yarn

Gemini API Key (from Google AI Studio)

1. Clone the Repository
Bash

git clone https://github.com/your-username/algoviz-pro.git
cd algoviz-pro
2. Backend Setup
Navigate to the backend folder: cd algoviz-pro-backend

Install dependencies: npm install

Create a .env file and add:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_secret_key
Start the server: npm run dev

3. Frontend Setup
Navigate to the frontend folder: cd algoviz-pro-frontend

Install dependencies: npm install

Create a .env file and add:

Code snippet

VITE_API_BASE_URL=http://localhost:5000/api
Start the development server: npm run dev

📂 Project Structure
/components: Reusable glassmorphic UI components like Sidebar, AlgorithmCard, and GlassCard.

/pages: Main application views (Landing, Dashboard, Visualizer, Auth).

/controllers: Backend logic for handling AI interactions and user data.

/utils: Helper functions, including the geminiCallWithRetry mechanism for API resilience.

🛠️ Resilience & Performance
The project includes a custom Exponential Backoff utility in the backend to handle Gemini API 503 Service Unavailable errors. This ensures the AI Tutor remains responsive even during high-traffic periods by automatically retrying failed requests.

📜 License
Distributed under the MIT License. See LICENSE for more information.







# AlgoVizAI

AI-powered DSA Visualizer

## Project Structure
- algoviz-pro-frontend
- algoviz-pro-backend

## Tech Stack
Frontend: React  
Backend: Node.js  

## How to Run
### Frontend
cd algoviz-pro-frontend
npm install
npm start

### Backend
cd algoviz-pro-backend
npm install
npm run dev
