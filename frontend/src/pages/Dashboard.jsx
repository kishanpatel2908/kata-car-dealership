import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PriceRangeSlider = ({ min, max, minVal, maxVal, onChange }) => {
    // Calculate percentages to color the active track between the two handles
    const minPercent = ((minVal - min) / (max - min)) * 100;
    const maxPercent = ((maxVal - min) / (max - min)) * 100;

    return (
        <div className="flex flex-col w-full md:w-64 pt-2">
        <label className="text-sm font-bold text-[#0a2540] mb-1">Price</label>
        <div className="text-sm font-bold text-[#0a2540] mb-3">
        ₹{minVal.toLocaleString()} – ₹{maxVal.toLocaleString()}+
        </div>

        {/* Slider Container */}
        <div className="relative h-1.5 bg-gray-200 rounded-lg flex items-center">
        {/* Active Blue Track */}
        <div
        className="absolute h-1.5 bg-[#20609C] rounded-lg"
        style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        ></div>

        {/* Min Input Handle */}
        <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={1000}
        onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal - 1000);
            onChange({ min: value, max: maxVal });
        }}
        className="absolute w-full h-1.5 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#20609C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
        />

        {/* Max Input Handle */}
        <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={1000}
        onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal + 1000);
            onChange({ min: minVal, max: value });
        }}
        className="absolute w-full h-1.5 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#20609C] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
        />
        </div>
        </div>
    );
};
export default function Dashboard() {
    const navigate = useNavigate();

    // App State
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    //const [isAdmin, setIsAdmin] = useState(false); // Toggle this to see Admin UI
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
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
    const startEditing = (vehicle) => {
        setEditingId(vehicle.id);
        setEditForm({ ...vehicle });
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

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        // Safely parse numbers. Default quantity to 0 for non-admins.
        const payload = {
            ...newVehicle,
            price: parseFloat(newVehicle.price) || 0,
            quantity: isAdmin ? (parseInt(newVehicle.quantity) || 0) : 0
        };

        try {
            const response = await fetch("http://localhost:8000/api/vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setVehicles([...vehicles, data]);
                setNewVehicle({ make: "", model: "", category: "", price: "", quantity: "" });
            } else {
                // Safely handle FastAPI array errors
                const errorMessage = Array.isArray(data.detail)
                ? data.detail.map(err => `${err.loc.join('.')}: ${err.msg}`).join(', ')
                : data.detail;
                alert(errorMessage || "Failed to add vehicle");
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



    // 5. ADMIN FUNCTION: DELETE VEHICLE
    const handleDeleteVehicle = async (vehicleId) => {
        console.log("Delete clicked for ID:", vehicleId);
        if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8000/api/vehicles/${vehicleId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            console.log("Response status:", response.status);
            if (response.ok) {
                setVehicles(vehicles.filter(v => v.id !== vehicleId));
            } else {
                const data = await response.json();
                alert(data.detail || "Failed to delete vehicle");
            }
        } catch (err) {
            alert("Network error during deletion");
        }
    };

    // 6. ADMIN FUNCTION : Update vehicle
    const handleUpdateVehicle = async (vehicleId) => {
        const token = localStorage.getItem("token");

        // CRITICAL: Safely parse numbers and exclude quantity if not admin
        const payload = {
            ...editForm,
            price: parseFloat(editForm.price) || 0,
        };

        if (isAdmin) {
            payload.quantity = parseInt(editForm.quantity) || 0;
        } else {
            // Remove quantity from payload entirely so backend doesn't reject it
            delete payload.quantity;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/vehicles/${vehicleId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setVehicles(vehicles.map(v => v.id === vehicleId ? { ...v, ...data } : v));
                setEditingId(null);
            } else {
                // Safely handle FastAPI array errors
                const errorMessage = Array.isArray(data.detail)
                ? data.detail.map(err => `${err.loc.join('.')}: ${err.msg}`).join(', ')
                : data.detail;
                console.error("Server Error:", data);
                alert("Failed to update: " + errorMessage);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            alert("Network error");
        }
    };

    // SEARCH & FILTER LOGIC
    const filteredVehicles = vehicles.filter(v => {
        const matchesSearch = v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter ? v.category === categoryFilter : true;

        // Price range logic
        const min = priceRange.min === "" ? 0 : parseFloat(priceRange.min);
        const max = priceRange.max === "" ? Infinity : parseFloat(priceRange.max);
        const matchesPrice = v.price >= min && v.price <= max;

        return matchesSearch && matchesCategory && matchesPrice;
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
        {
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
            <select
            required
            className="w-full border p-2 rounded"
            value={newVehicle.category || ""}
            onChange={e => setNewVehicle({...newVehicle, category: e.target.value})}
            >
            <option value="" disabled>Select Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
            <option value="Luxury">Luxury</option>
            </select>
            </div>
            <div className="w-24">
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Price (₹)</label>
            <input type="number" required className="w-full border p-2 rounded" value={newVehicle.price} onChange={e => setNewVehicle({...newVehicle, price: e.target.value})} />
            </div>
            {isAdmin && (
                <div className="w-20">
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Qty</label>
                <input type="number" required className="w-full border p-2 rounded" value={newVehicle.quantity} onChange={e => setNewVehicle({...newVehicle, quantity: e.target.value})} />
                </div>
            )}
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded h-[42px] transition">
            Add
            </button>
            </form>
            </div>
            }



        {/* SEARCH AND FILTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">

        {/* Left Side: Search */}
        <div className="flex-1 w-full md:max-w-md">
        <input
        type="text"
        placeholder="Search make or model..."
        className="p-3 border rounded shadow-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>

        {/* Right Side: Price Range & Category */}
        <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">

        {/* The Custom Price Range Slider */}
        <PriceRangeSlider
        min={0}
        max={10000000} // Set your absolute maximum price here
        minVal={priceRange.min === "" ? 0 : priceRange.min}
        maxVal={priceRange.max === "" ? 10000000 : priceRange.max}
        onChange={setPriceRange}
        />

        {/* Category Dropdown (Far Right) */}
        <select
        className="p-3 border rounded shadow-sm outline-none w-full md:w-48 bg-gray-50"
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
        </div>

        {/* INVENTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100">
            <div className="p-6 flex-grow">

            {/* CARD CONTENT */}
            {editingId === vehicle.id ? (
                <div className="space-y-2">
                <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                <input
                className="text-2xl font-black text-gray-900 border-b-2 border-blue-500 outline-none w-auto"
                style={{ width: `${Math.max(editForm.make?.length || 5, 5)}ch` }}
                value={editForm.make}
                onChange={e => setEditForm({...editForm, make: e.target.value})}
                />
                <input
                className="text-lg text-gray-600 border-b-2 border-blue-500 outline-none w-auto"
                style={{ width: `${Math.max(editForm.model?.length || 8, 8)}ch` }}
                value={editForm.model}
                onChange={e => setEditForm({...editForm, model: e.target.value})}
                />
                </div>
                <select
                className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded font-bold uppercase border border-gray-400"
                value={editForm.category || "Sedan"}
                onChange={e => setEditForm({...editForm, category: e.target.value})}
                >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Sports">Sports</option>
                <option value="Luxury">Luxury</option>
                </select>
                </div>
                </div>
            ) : (
                <div className="flex justify-between items-start mb-2">
                <div>
                <h3 className="text-2xl font-black text-gray-900">{vehicle.make}</h3>
                <p className="text-lg text-gray-600">{vehicle.model}</p>
                </div>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded font-bold uppercase">{vehicle.category}</span>
                </div>
            )}

            {/* PRICE & STOCK (Always visible) */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-end">
            <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Price</p>
            {editingId === vehicle.id ? (
                <input type="number" className="text-xl font-bold text-green-600 border-b-2 border-blue-500 w-24 outline-none"
                value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} />
            ) : (
                <p className="text-xl font-bold text-green-600">₹{vehicle.price.toLocaleString()}</p>
            )}
            </div>
            <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-bold">In Stock</p>
            {editingId === vehicle.id ? (
                // Only Admins get the input field to edit quantity
                isAdmin ? (
                    <input type="number" className="text-xl font-black text-blue-600 border-b-2 border-blue-500 w-16 outline-none text-right"
                    value={editForm.quantity} onChange={e => setEditForm({...editForm, quantity: e.target.value})} />
                ) : (
                    // Regular users just see the static quantity while editing
                    <p className={`text-xl font-black ${vehicle.quantity > 0 ? "text-blue-600" : "text-red-500"}`}>
                    {vehicle.quantity} <span className="text-[10px] text-gray-400 font-normal block">(Admin only)</span>
                    </p>
                )
            ) : (
                <p className={`text-xl font-black ${vehicle.quantity > 0 ? "text-blue-600" : "text-red-500"}`}>{vehicle.quantity}</p>
            )}
            </div>
            </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="bg-gray-50 p-4 border-t flex justify-between gap-2">
            {editingId === vehicle.id ? (
                <>
                <button onClick={() => handleUpdateVehicle(vehicle.id)} className="flex-1 bg-green-600 text-white font-bold py-2 rounded text-sm">Confirm</button>
                <button onClick={() => setEditingId(null)} className="flex-1 bg-red-500 text-white font-bold py-2 rounded text-sm">Cancel</button>
                </>
            ) : (
                <>
                <button onClick={() => handlePurchase(vehicle.id)} disabled={vehicle.quantity <= 0 || editingId !== null} className="flex-1 bg-black text-white font-bold py-2 rounded text-sm disabled:bg-gray-400 disabled:cursor-not-allowed">Purchase</button>

                {/* Edit button is now available to EVERYONE */}
                <button onClick={() => startEditing(vehicle)} className="bg-yellow-500 text-white px-3 py-2 rounded font-bold text-xs">Edit</button>

                {/* Delete button remains strictly for Admins */}
                {isAdmin && (
                    <button onClick={() => handleDeleteVehicle(vehicle.id)} className="bg-red-500 text-white px-3 py-2 rounded font-bold text-xs">Del</button>
                )}
                </>
            )}
            </div>
            </div>
        ))}
        </div>

        </div>
        </div>
    );
}
