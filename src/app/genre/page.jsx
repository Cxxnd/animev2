import Link from "next/link";
import { getAnime } from "@/libs/service-api";

const Page = async () => {
    // Ambil data genre dari API kamu
    const genreData = await getAnime("/genres");

    return (
        <section className="px-6 py-8 min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Daftar Genre Anime
            </h1>

            {genreData?.data?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {genreData.data.map((genre, index) => (
                        <Link
                            key={index}
                            href={`/genre/${genre.slug}`}
                            className="bg-gray-800 hover:bg-purple-600 transition-all rounded-lg p-4 text-center font-semibold capitalize shadow-md hover:shadow-lg"
                        >
                            {genre.name}
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400">
                    Tidak ada genre ditemukan.
                </p>
            )}
        </section>
    );
};

export default Page;
