import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard.jsx';
import { useAuth } from '../context/AuthContext.jsx'; // Use the context hook

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState(null);
    const navigate = useNavigate();
    const { register, loading } = useAuth(); // Use register and loading from context

    const handleSignup = async (e) => {
        e.preventDefault();
        setLocalError(null);

        try {
            // Call the actual registration service via context
            await register(username, email, password);
            navigate('/algorithms'); // Navigate to the dashboard on successful registration
        } catch (error) {
            // The context throws an error with the message from the backend
            setLocalError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-8">
            <GlassCard className="max-w-md w-full p-10 space-y-6">
                <h1 className="text-3xl font-extrabold text-teal-400 text-center">Sign Up</h1>
                
                {/* Display Error Message */}
                {localError && (
                    <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-center text-sm border border-red-700">
                        {localError}
                    </div>
                )}
                
                <form onSubmit={handleSignup} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-teal-500/50" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-teal-500/50" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-teal-500/50" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button 
                        type="submit"
                        className="w-full bg-teal-600 py-3 rounded-lg font-bold hover:bg-teal-700 transition shadow-lg"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="text-center text-gray-400 text-sm">Already have an account? <Link to="/login" className="text-teal-400">Login</Link></p>
            </GlassCard>
        </div>
    );
};
export default SignupPage;