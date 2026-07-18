import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-6">

        {/* GLOWING HEADLIGHTS EFFECT */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>

        {/* LOGIN BOX */}
        <div className="relative z-10 bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-black text-white mb-6 text-center tracking-widest">LOGIN</h2>

        <form className="space-y-4">
        <div>
        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Email</label>
        <input
        type="email"
        className="w-full bg-black/50 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        </div>
        <div>
        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Password</label>
        <input
        type="password"
        className="w-full bg-black/50 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        </div>
        <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg uppercase tracking-widest transition shadow-lg shadow-blue-900/20"
        >
        Sign In
        </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline font-bold">
        Register here
        </Link>
        </div>
        </div>
        </div>
    );
}
