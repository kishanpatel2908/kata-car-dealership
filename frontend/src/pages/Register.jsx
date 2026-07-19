import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            const response = await fetch("http://localhost:8000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (response.ok) {
                navigate("/login");
            } else {
                const data = await response.json();
                setError(data.detail || "Registration failed");
            }
        } catch (err) {
            setError("Network error. Is the server running?");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-6">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>

        <div className="relative z-10 bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
        <h2 className="text-3xl font-black text-white mb-6 text-center tracking-widest">REGISTER</h2>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Full Name</label>
        <input
        type="text"
        className="w-full bg-black/50 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
        />
        </div>
        <div>
        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Email</label>
        <input
        type="email"
        className="w-full bg-black/50 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
        />
        </div>
        <div>
        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Password</label>
        <input
        type="password"
        className="w-full bg-black/50 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
        />
        </div>
        <div>
        <label className="block text-gray-400 text-xs font-bold uppercase mb-1">Confirm Password</label>
        <input
        type="password"
        className="w-full bg-black/50 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        required
        />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg uppercase tracking-widest transition shadow-lg shadow-blue-900/20 mt-2">
        Create Account
        </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline font-bold">Login here</Link>
        </div>
        </div>
        </div>
    );
}
