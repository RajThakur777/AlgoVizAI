# 🎓 AlgoVizAI — Interactive DSA Learning Engine

AlgoVizAI is a **high-fidelity, full-stack web application** designed to help students master **Data Structures and Algorithms (DSA)**. By combining **real-time step-by-step visualizations** with an **AI-powered pedagogical tutor**, it bridges the gap between static code and true conceptual understanding.

---

## 🚀 Key Features

### 🔍 High-Fidelity Visualizations

Interactive, real-time rendering of:

* Sorting algorithms
* Searching algorithms
* Tree traversals
* Graph algorithms

### 🤖 AI Pedagogical Tutor

* Powered by **Google Gemini 2.5 Flash**
* Provides context-aware hints
* Explains algorithm logic
* Performs time & space complexity analysis
* Adapts explanations based on the **current visualization state**

### ⏯️ Step-by-Step Traversal

* Pause, rewind, and resume algorithms
* Control simulation speed
* Observe how data moves at each step

### 💡 Live Code Highlighting

* Real-time synchronization between visualization and code
* Highlights the exact line of code being executed

### 🎨 Glassmorphism UI

* Modern deep-space themed design
* Layered blur & glass effects
* Smooth transitions using **Framer Motion**

### 🔐 Secure Authentication

* User registration & login
* JWT-based authentication
* Protected routes and dashboards

---

## 🛠️ Tech Stack

### Frontend

* **React.js + Vite** — Fast and modular UI development
* **Tailwind CSS** — Utility-first styling with glassmorphism
* **Framer Motion** — Smooth animations & transitions
* **React Router** — Client-side routing & protected routes

### Backend

* **Node.js & Express.js** — RESTful API and server logic
* **MongoDB** — Persistent storage for users and saved states
* **Google Gemini SDK** — AI-powered tutor integration
* **JWT** — Secure authentication
* **CORS & Dotenv** — Environment & security management

---

## 📦 Installation & Setup

### ✅ Prerequisites

* Node.js **v18+**
* npm or yarn
* Google **Gemini API Key** (from Google AI Studio)

---

### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/algoviz-pro.git
cd algoviz-pro
```

---

## ⚙️ Backend Setup

```bash
cd algoviz-pro-backend
npm install
```

### 🔑 Environment Variables

Create a `.env` file in `algoviz-pro-backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_secret_key
```

### ▶️ Start Backend Server

```bash
npm run dev
```

---

## ⚙️ Frontend Setup

```bash
cd algoviz-pro-frontend
npm install
```

### 🔑 Environment Variables

Create a `.env` file in `algoviz-pro-frontend`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### ▶️ Start Frontend Server

```bash
npm run dev
```

---

## 📂 Project Structure

```
algoviz-pro/
├── algoviz-pro-frontend/
│   ├── components/   # Glassmorphic UI components
│   ├── pages/        # Landing, Dashboard, Visualizer, Auth
│   └── utils/
│
├── algoviz-pro-backend/
│   ├── controllers/  # AI logic & user handling
│   ├── routes/       # API routes
│   ├── utils/        # Helper utilities
│   └── config/
```

---

## 🛠️ Resilience & Performance

* Custom **Exponential Backoff** mechanism for Gemini API calls
* Automatically retries on `503 Service Unavailable` errors
* Ensures AI Tutor remains responsive during high traffic

---

## 📜 License

Distributed under the **MIT License**.
See the `LICENSE` file for more information.

---

## 🌟 AlgoVizAI

**AI-powered DSA Visualizer**
Learn algorithms the way they actually work 🚀
