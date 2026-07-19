import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="w-full min-h-screen font-sans bg-black">

        {/* HEADER */}
        <header className="fixed top-0 w-full flex justify-between items-center px-8 py-5 z-50 bg-black/50 backdrop-blur-sm">
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-widest text-white hover:text-blue-400 transition">
        CAR DEALERSHIP
        </Link>
        <Link to="/login" className="text-xs md:text-sm font-bold uppercase tracking-widest text-white hover:text-blue-400 transition">
        Login / Register
        </Link>
        </header>

        {/* PART 2: TOP SECTION */}
        <section className="relative h-96 w-full bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center mt-16">
        <div className="absolute left-0 w-1/2 px-8 md:px-16 z-20">
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-4">
        Unrivaled Speed.<br />Fast Service.
        </h1>
        <p className="text-blue-100 text-sm md:text-lg max-w-sm hidden md:block">
        Experience the pinnacle of automotive engineering with premium selection and zero-friction customer care.
        </p>
        </div>
        <div className="absolute right-0 w-1/2 h-full z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-transparent to-transparent z-20"></div>
        <img src="https://bugatti-newsroom.imgix.net/667499268f9399fbd36b30c1/BUGATTI-World-Premiere-Presskit-Images-01.jpg" alt="Bugatti" className="w-full h-full object-cover" />
        </div>
        </section>

        {/* PART 3: MIDDLE SECTION */}
        <section className="relative h-96 w-full flex flex-col items-center justify-center text-center">
        <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsdCvaOeXEvWE2FSHUpPp1J0vdHlTIZTsslAh7dEHFxg&s=10"
        alt="Premium Showroom Background"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
        />
        <div className="relative z-10 p-6 bg-black/20 backdrop-blur-sm rounded-xl">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
        CAR DEALERSHIP
        </h2>
        <Link to="/login" className="inline-block bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition shadow-lg">
        Welcome
        </Link>
        </div>
        </section>

        {/* PART 4: BOTTOM SECTION */}
        <section className="relative h-96 w-full bg-black flex items-center">
        <div className="absolute left-0 w-1/2 h-full z-10">
        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent z-20"></div>
        <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200" alt="Sleek Black Car" className="w-full h-full object-cover" />
        </div>
        <div className="absolute right-0 w-1/2 px-8 md:px-16 z-20 text-right flex flex-col items-end">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-500 mb-4">
        Precision<br />Engineering.
        </h2>
        <p className="text-gray-400 text-sm md:text-lg max-w-sm hidden md:block">
        Every vehicle in our showroom is meticulously inspected to ensure you drive away with perfection.
        </p>
        </div>
        </section>

        </div>
    );
}
