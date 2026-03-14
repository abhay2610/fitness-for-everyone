import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (!result.success) {
      setError(typeof result.error === 'string' ? result.error : 'Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0c] flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#3a5a3a] flex items-center justify-center">
            <span className="text-[#8fbc8f] font-bold text-3xl">A</span>
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-[#6b8b6b] text-sm">Sign in to continue your fitness journey</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="alex@example.com"
            />
          </div>

          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3a5a3a] hover:bg-[#4a6a4a] disabled:bg-[#2a3a2a] text-white font-semibold py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Switch to Signup */}
        <div className="mt-6 text-center">
          <p className="text-[#6b8b6b] text-sm">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-[#8fbc8f] font-semibold hover:text-[#a0ccb0] transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
