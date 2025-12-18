import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard.jsx';
import { useAuth } from '../context/AuthContext.jsx'; // Use the context hook

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState(null);
    const navigate = useNavigate();
    const { login, loading } = useAuth(); // Use login and loading from context

    const handleLogin = async (e) => {
        e.preventDefault();
        setLocalError(null);

        try {
            // Call the actual login service via context
            await login(email, password); 
            navigate('/algorithms'); // Navigate on successful login
        } catch (error) {
            // The context throws an error with the message from the backend
            setLocalError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-8">
            <GlassCard className="max-w-md w-full p-10 space-y-6">
                <h1 className="text-3xl font-extrabold text-indigo-400 text-center">Login</h1>
                
                {/* Display Error Message */}
                {localError && (
                    <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-center text-sm border border-red-700">
                        {localError}
                    </div>
                )}
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-indigo-500/50" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-indigo-500/50" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button 
                        type="submit"
                        className="w-full bg-indigo-600 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg"
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <p className="text-center text-gray-400 text-sm">Don't have an account? <Link to="/signup" className="text-indigo-400">Sign Up</Link></p>
            </GlassCard>
        </div>
    );
};
export default LoginPage;