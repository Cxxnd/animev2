import Link from "next/link";
import InputSearch from "./inputSearch";

const Navbar = () => {
    return (
        <header className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-800 rounded-b-xl shadow-lg sticky top-0 z-50">
            <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
                {/* Logo/Brand Name */}
                <Link
                    href="/"
                    className="font-extrabold text-3xl text-white hover:text-gray-300 transition-colors duration-300"
                >
                    ANIMEV2
                </Link>

                {/* Search Input */}
                <InputSearch className="w-full md:w-auto" />
            </div>
        </header>
    );
};

export default Navbar;
