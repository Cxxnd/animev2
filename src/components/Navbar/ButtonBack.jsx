"use client";
import { Rewind } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
const page = () => {
    const router = useRouter();
    const handleBack = (event) => {
        event.preventDefault();
        router.back();
    };
    return (
        <button className="text-white hover:bg-blue-700 hover:scale-110">
            <Rewind size={32} onClick={handleBack} />
        </button>
    );
};
export default page;
