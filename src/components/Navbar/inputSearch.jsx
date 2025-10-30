"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const InputSearch = () => {
    const searchRef = useRef();
    const router = useRouter();
    const [error, setError] = useState(false);

    const handleSearch = (event) => {
        event.preventDefault();
        const trimmedKeyword = searchRef.current.value.trim();
        if (!trimmedKeyword) {
            setError(true);
            setTimeout(() => setError(false), 2000);
            return;
        }

        const encoded = encodeURIComponent(trimmedKeyword);
        router.push(`/search/${encoded}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") handleSearch(event);
    };

    return (
        <div className="relative w-full max-w-sm mx-auto">
            <input
                placeholder="Cari anime..."
                className={`w-full p-3 pr-12 rounded-xl bg-zinc-900/70 text-white placeholder-gray-400 border ${
                    error ? "border-red-500" : "border-transparent"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                ref={searchRef}
                onKeyDown={handleKeyDown}
            />

            <button
                onClick={handleSearch}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300 hover:text-white transition"
            >
                <MagnifyingGlass size={26} weight="bold" />
            </button>

            {/* Pesan error */}
            {error && (
                <p className="text-red-500 text-sm text-center animate-pulse">
                    Isi dulu kata kunci pencarian 🔍
                </p>
            )}
        </div>
    );
};

export default InputSearch;
