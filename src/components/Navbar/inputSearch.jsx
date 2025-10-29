"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useState } from "react";

const InputSearch = () => {
    const searchRef = useRef();
    const router = useRouter();
    const [keyword, setKeyword] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        const trimmedKeyword = searchRef.current.value.trim();
        const decoded = encodeURIComponent(trimmedKeyword);
        router.push(`/search/${decoded}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch(event);
        }
    };

    return (
        <div className="relative">
            <input
                placeholder="Search"
                className="w-full p-2 rounded"
                ref={searchRef}
                onKeyDown={handleKeyDown}
            />
            <button className="absolute top-2 end-2" onClick={handleSearch}>
                <MagnifyingGlass size={32} />
            </button>
        </div>
    );
};

export default InputSearch;
