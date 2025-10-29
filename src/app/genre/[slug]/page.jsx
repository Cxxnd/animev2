"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getAnime } from "@/libs/service-api";
import Pagination from "@/components/Utilities/Pagination";
import AnimeList from "@/components/AnimeList";

const GenreDetailPage = ({ params }) => {
    const { slug } = React.use(params);
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
                    resource: `genre/${slug}?page=${page}`,
                });

                console.log("API Response:", res); // Untuk debugging
                setAnimeData(res || {});
            } catch (error) {
                console.error("Error fetching data:", error);
                setAnimeData({});
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, slug]); // ✅ PERBAIKAN: Hapus fetchData dari dependency

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold capitalize text-white tracking-wide">
                    Genre:{" "}
                    <span className="text-blue-400">
                        {slug.replace(/-/g, " ")}
                    </span>
                </h1>
                <p className="text-gray-400 mt-2 sm:mt-0">
                    Halaman{" "}
                    <span className="text-white font-semibold">{page}</span>{" "}
                    dari{" "}
                    <span className="text-white font-semibold">
                        {animeData?.data?.pagination?.last_visible_page || 1}
                    </span>
                </p>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400">
                    Memuat data...
                </div>
            ) : !animeData?.data?.anime || animeData.data.anime.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    Tidak ada anime ditemukan di genre ini
                </div>
            ) : (
                <>
                    <AnimeList api={animeData} />
                    <div className="flex justify-center mt-10">
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

export default GenreDetailPage;
