// src/app/search/[keyword]/page.jsx
import { getAnime } from "@/libs/service-api";
import AnimeList from "@/components/AnimeList";
import Pagination from "@/components/Utilities/Pagination";

const Page = async ({ params, searchParams }) => {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const { keyword } = resolvedParams;
    const decodedKeyword = decodeURIComponent(keyword);
    const page = resolvedSearchParams?.page || "1";

    try {
        console.log("🔍 Searching for:", decodedKeyword);
        console.log("📄 Page:", page);

        // Coba beberapa endpoint berbeda
        const searchResult = await getAnime({
            resource: "anime",
            query: `q=${encodeURIComponent(decodedKeyword)}&page=${page}`,
        });

        console.log(
            "📊 Search Result Structure:",
            JSON.stringify(searchResult, null, 2)
        );

        // Cek berbagai kemungkinan struktur error
        if (
            searchResult.status === "error" ||
            searchResult.error ||
            searchResult.message?.includes("Error")
        ) {
            console.log("❌ API returned error");
            return (
                <section className="p-6 max-w-7xl mx-auto">
                    <h1 className="text-3xl font-extrabold capitalize text-white tracking-wide mb-8">
                        Hasil Pencarian Anime:{" "}
                        <span className="text-blue-400">{decodedKeyword}</span>
                    </h1>
                    <div className="text-center py-10">
                        <p className="text-red-400 text-lg mb-2">
                            Error dari API:{" "}
                            {searchResult.message || searchResult.error}
                        </p>
                        <p className="text-gray-400 text-sm">
                            Coba gunakan kata kunci yang berbeda atau refresh
                            halaman.
                        </p>
                    </div>
                </section>
            );
        }

        // Cek berbagai kemungkinan struktur data kosong
        const hasData =
            (searchResult.data && searchResult.data.length > 0) ||
            (searchResult.results && searchResult.results.length > 0) ||
            (searchResult.anime && searchResult.anime.length > 0);

        if (!hasData) {
            console.log("📭 No data found in response");
            return (
                <section className="p-6 max-w-7xl mx-auto">
                    <h1 className="text-3xl font-extrabold capitalize text-white tracking-wide mb-8">
                        Hasil Pencarian Anime:{" "}
                        <span className="text-blue-400">{decodedKeyword}</span>
                    </h1>
                    <div className="text-center py-10">
                        <p className="text-gray-400 text-lg mb-4">
                            Tidak ada hasil ditemukan untuk "{decodedKeyword}"
                        </p>
                        <div className="text-sm text-gray-500 space-y-1">
                            <p>💡 Coba saran berikut:</p>
                            <p>• Periksa ejaan kata kunci</p>
                            <p>• Gunakan kata kunci yang lebih umum</p>
                            <p>• Coba judul yang berbeda</p>
                        </div>
                    </div>
                </section>
            );
        }

        console.log("✅ Data found, rendering AnimeList");
        const pagination = searchResult.pagination;

        return (
            <section className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold capitalize text-white tracking-wide mb-8">
                    Hasil Pencarian Anime:{" "}
                    <span className="text-blue-400">{decodedKeyword}</span>
                </h1>

                <AnimeList api={searchResult} />

                {/* Conditional Pagination */}
                {pagination && pagination.last_visible_page > 1 && (
                    <div className="flex justify-center mt-10">
                        <Pagination
                            page={parseInt(page)}
                            lastPage={pagination.last_visible_page}
                        />
                    </div>
                )}
            </section>
        );
    } catch (error) {
        console.error("🚨 Error fetching search results:", error);

        return (
            <section className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold capitalize text-white tracking-wide mb-8">
                    Hasil Pencarian Anime:{" "}
                    <span className="text-blue-400">{decodedKeyword}</span>
                </h1>
                <div className="text-center py-10">
                    <p className="text-red-400 text-lg mb-2">
                        Terjadi kesalahan koneksi
                    </p>
                    <p className="text-gray-400 text-sm mb-4">
                        Error: {error.message}
                    </p>
                    <p className="text-gray-500 text-sm">
                        Pastikan koneksi internet stabil dan coba lagi.
                    </p>
                </div>
            </section>
        );
    }
};

export default Page;
