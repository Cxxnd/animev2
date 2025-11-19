"use client";
import "../components/css/loading.css";
import { useEffect } from "react";

const Loading = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
            <div className="loader"></div>
        </div>
    );
};
export default Loading;
