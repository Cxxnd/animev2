"use client";
import { useEffect } from "react";
import "../components/css/loading.css";

const Loading = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="min-h-svh flex items-center justify-center">
            <span className="loader"></span>
        </div>
    );
};

export default Loading;
