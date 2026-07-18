import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to the Project
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
        This is the starting point of our application. Secure your access by logging in.
        </p>
        <Link
        to="/login"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
        >
        Go to Login
        </Link>
        </div>
    );
}
