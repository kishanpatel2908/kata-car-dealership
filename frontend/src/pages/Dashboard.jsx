import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    // App State
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    //const [isAdmin, setIsAdmin] = useState(false); // Toggle this to see Admin UI
    const [error, setError] = useState("");

    // Admin Form State
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const [newVehicle, setNewVehicle] = useState({
        make: "", model: "", category: "", price: "", quantity: ""
    });

    // 1. PROTECTED ROUTE CHECK & FETCH DATA
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        fetchVehicles(token);
    }, [navigate]);

    const fetchVehicles = async (token) => {
        try {
            const response = await fetch("http://localhost:8000/api/vehicles", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setVehicles(data);
            } else if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } catch (err) {
            setError("Failed to fetch vehicles. Is the server running?");
        }
    };

    // 2. USER FUNCTION: PURCHASE VEHICLE
    const handlePurchase = async (vehicleId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8000/api/vehicles/${vehicleId}/purchase`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                // Update local state to instantly reflect reduced quantity
                setVehicles(vehicles.map(v =>
                v.id === vehicleId ? { ...v, quantity: v.quantity - 1 } : v
                ));
            } else {
                const data = await response.json();
                alert(data.detail || "Purchase failed");
            }
        } catch (err) {
            alert("Network error during purchase");
        }
    };

    // 3. ADMIN FUNCTION: ADD VEHICLE
    const handleAddVehicle = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:8000/api/vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...newVehicle,
                    price: parseFloat(newVehicle.price),
                                     quantity: parseInt(newVehicle.quantity)
                })
            });

            if (response.ok) {
                const addedVehicle = await response.json();
                setVehicles([...vehicles, addedVehicle]);
                setNewVehicle({ make: "", model: "", category: "", price: "", quantity: "" });
            } else {
                const data = await response.json();
                alert(data.detail || "Failed to add vehicle (Admin only)");
            }
        } catch (err) {
            alert("Network error");
        }
    };

    // 4. LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin"); // Clear admin status on logout
        navigate("/login");
    };

    // SEARCH & FILTER LOGIC
    const filteredVehicles = vehicles.filter(v => {
        const matchesSearch = v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter ? v.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-100 font-sans pb-10">

        {/* NAVBAR */}
        <nav className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-black tracking-widest">DEALERSHIP DASHBOARD</h1>

        <div className="flex gap-4 items-center">

        {/* CONDITIONAL ADMIN TEXT */}
        {isAdmin && (
            <span className="text-yellow-400 text-xs font-bold uppercase animate-pulse">
            Admin Mode Active
            </span>
        )}

        {/* Mock Admin Toggle */}


        <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-bold transition"
        >
        Logout
        </button>
        </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 mt-8">
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}

        {/* ADMIN SECTION: ADD VEHICLE */}
        {isAdmin && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-blue-600">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Admin Controls: Add Inventory</h2>
            <form onSubmit={handleAddVehicle} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Make</label>
            <input type="text" required className="w-full border p-2 rounded" value={newVehicle.make} onChange={e => setNewVehicle({...newVehicle, make: e.target.value})} placeholder="e.g. Porsche" />
            </div>
            <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Model</label>
            <input type="text" required className="w-full border p-2 rounded" value={newVehicle.model} onChange={e => setNewVehicle({...newVehicle, model: e.target.value})} placeholder="e.g. 911 GT3" />
            </div>
            <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Category</label>
            <select className="w-full border p-2 rounded" value={newVehicle.category} onChange={e => setNewVehicle({...newVehicle, category: e.target.value})}>
            <option value="">Select...</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
            <option value="Luxury">Luxury</option>
            </select>
            </div>
            <div className="w-24">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Price ($)</label>
            <input type="number" required className="w-full border p-2 rounded" value={newVehicle.price} onChange={e => setNewVehicle({...newVehicle, price: e.target.value})} />
            </div>
            <div className="w-20">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Qty</label>
            <input type="number" required className="w-full border p-2 rounded" value={newVehicle.quantity} onChange={e => setNewVehicle({...newVehicle, quantity: e.target.value})} />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded h-[42px] transition">
            Add
            </button>
            </form>
            </div>
        )}

        {/* SEARCH AND FILTER */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
        type="text"
        placeholder="Search make or model..."
        className="p-3 border rounded shadow-sm w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
        className="p-3 border rounded shadow-sm outline-none"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        >
        <option value="">All Categories</option>
        <option value="Sedan">Sedan</option>
        <option value="SUV">SUV</option>
        <option value="Sports">Sports</option>
        <option value="Luxury">Luxury</option>
        </select>
        </div>

        {/* INVENTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition">
            <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-2">
            <div>
            <h3 className="text-2xl font-black text-gray-900">{vehicle.make}</h3>
            <p className="text-lg text-gray-600">{vehicle.model}</p>
            </div>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded font-bold uppercase">
            {vehicle.category}
            </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-end">
            <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Price</p>
            <p className="text-xl font-bold text-green-600">${vehicle.price.toLocaleString()}</p>
            </div>
            <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-bold">In Stock</p>
            <p className={`text-xl font-black ${vehicle.quantity > 0 ? "text-blue-600" : "text-red-500"}`}>
            {vehicle.quantity}
            </p>
            </div>
            </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="bg-gray-50 p-4 border-t flex justify-between gap-2">
            <button
            onClick={() => handlePurchase(vehicle.id)}
            disabled={vehicle.quantity <= 0}
            className={`flex-1 font-bold py-2 px-4 rounded uppercase tracking-wider text-sm transition ${
                vehicle.quantity > 0
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            >
            {vehicle.quantity > 0 ? "Purchase" : "Out of Stock"}
            </button>

            {/* Admin Actions (Stubs) */}
            {isAdmin && (
                <>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded font-bold text-xs">Edit</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-bold text-xs">Del</button>
                </>
            )}
            </div>
            </div>
        ))}

        {filteredVehicles.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 font-bold">
            No vehicles found matching your criteria.
            </div>
        )}
        </div>

        </div>
        </div>
    );
}
