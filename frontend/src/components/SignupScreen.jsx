import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignupScreen({ onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [sex, setSex] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await register({
      email,
      password,
      name,
      age: age ? Number(age) : undefined,
      heightCm: heightCm ? Number(heightCm) : undefined,
      weightKg: weightKg ? Number(weightKg) : undefined,
      sex: sex || undefined,
    });

    if (!result.success) {
      setError(
        typeof result.error === "string" ? result.error : "Registration failed",
      );
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
          <h1 className="text-white text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-[#6b8b6b] text-sm">
            Start your fitness journey with Aura
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="28"
              min="0"
            />
          </div>
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Sex
            </label>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5a8a5a] transition-colors"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="175"
              min="0"
            />
          </div>
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="70"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="Alex"
            />
          </div>

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

          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-[#6b8b6b] text-sm">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-[#8fbc8f] font-semibold hover:text-[#a0ccb0] transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
