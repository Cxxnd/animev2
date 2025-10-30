"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAnime } from "@/libs/service-api";
import ButtonBack from "@/components/Navbar/ButtonBack";
import Pagination from "@/components/Utilities/Pagination";
import AnimeList from "@/components/AnimeList";

const CompletePage = () => {
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page")) || 1;

    const [page, setPage] = useState(currentPage);
    const [animeData, setAnimeData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getAnime({
                    resource: `complete-anime/${page}`,
                });
                setAnimeData(res || {});
            } catch (error) {
                console.error("❌ Error fetching complete anime:", error);
                setAnimeData({});
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <ButtonBack />
                <h1 className="text-3xl font-extrabold text-white tracking-wide text-center sm:text-left mt-4 sm:mt-0">
                    ✅ <span className="text-purple-400">Complete Anime</span>
                </h1>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-20 text-gray-400">
                    Sedang memuat data anime...
                </div>
            ) : !animeData?.data?.anime || animeData.data.anime.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    Tidak ada anime yang ditemukan.
                </div>
            ) : (
                <>
                    {/* List Anime */}
                    <AnimeList api={animeData} />

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-10 flex-col gap-2">
                        <p className="text-gray-400">
                            Halaman{" "}
                            <span className="text-white font-semibold">
                                {page}
                            </span>{" "}
                            dari{" "}
                            <span className="text-white font-semibold">
                                {animeData?.data?.pagination
                                    ?.last_visible_page || 1}
                            </span>
                        </p>
                        <Pagination
                            page={page}
                            lastPage={
                                animeData?.data?.pagination
                                    ?.last_visible_page || 1
                            }
                            setPage={setPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CompletePage;
