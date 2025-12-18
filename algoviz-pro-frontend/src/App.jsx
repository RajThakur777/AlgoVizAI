import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import AlgorithmSelectionPage from './pages/AlgorithmSelectionPage.jsx';
import VisualizerPage from './pages/VisualizerPage.jsx';
import Footer from './components/Footer.jsx';

const MainLayout = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/algorithms');
    const isVisualizer = location.pathname.startsWith('/visualizer');
    const showSidebar = isDashboard || isVisualizer;

    return (
        <div className="flex flex-col min-h-screen bg-[#0f172a]">
            {!showSidebar && <Navbar />}
            
            <div className="flex flex-1">
                {/* Fixed Sidebar remains static */}
                {showSidebar && <Sidebar />}
                
                {/* FIXED: Added 'ml-72' when sidebar is present to prevent overlap.
                  Removed 'overflow-hidden' to allow the entire page to scroll naturally 
                */}
                <main className={`flex-1 flex flex-col ${showSidebar ? 'ml-72' : ''}`}>
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/algorithms" element={<AlgorithmSelectionPage />} />
                                <Route path="/visualizer/:algoSlug" element={<VisualizerPage />} />
                            </Route>
                        </Routes>
                    </div>
                    
                    {/* Show footer only on public pages */}
                    {!showSidebar && <Footer />}
                </main>
            </div>
        </div>
    );
};

const App = () => (
    <Router><MainLayout /></Router>
);
export default App;