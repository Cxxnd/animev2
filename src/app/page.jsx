import Image from "next/image";
import Link from "next/link";
import { getAnime } from "@/libs/service-api";

const Page = async () => {
    const animeHome = await getAnime({ resource: "home" });

    const ongoingAnime = animeHome?.data?.ongoing_anime || [];
    const completeAnime = animeHome?.data?.complete_anime || [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 px-6 py-10 text-white">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 drop-shadow-md">
                    AnimeV2
                </h1>
                <p className="text-gray-400 mt-2">
                    Tonton anime favoritmu dengan tampilan elegan dan cepat 🚀
                </p>
                <p className="text-cyan-800">Website Create by Faza</p>
            </div>

            {/* Ongoing Anime */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-blue-400 border-b border-blue-700 pb-2">
                        🔥 Ongoing Anime
                    </h2>
                </div>

                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
                    {ongoingAnime.map((anime, index) => (
                        <Link
                            href={`/anime/${anime.slug}`}
                            key={`ongoing-${index}`}
                            className="group relative bg-gray-900/60 border border-gray-800 hover:border-blue-600 rounded-2xl overflow-hidden shadow-md hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Poster */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <Image
                                    src={anime.poster}
                                    alt={anime.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* Info */}
                            <div className="p-3">
                                <h3 className="text-sm font-semibold line-clamp-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                                    {anime.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            <div className="flex items-center justify-center mt-4 mb-12 sm:mb-6">
                <Link
                    href="/genre"
                    className="text-sm hover:text-purple-300 transition-colors duration-300 bg-blue-600 px-3 py-1 rounded-md"
                >
                    Lihat Genre
                </Link>
            </div>

            {/* Complete Anime */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-purple-400 border-b border-purple-700 pb-2">
                        ✅ Complete Anime
                    </h2>
                </div>

                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
                    {completeAnime.map((anime, index) => (
                        <Link
                            href={`/anime/${anime.slug}`}
                            key={`complete-${index}`}
                            className="group relative bg-gray-900/60 border border-gray-800 hover:border-purple-600 rounded-2xl overflow-hidden shadow-md hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Poster */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <Image
                                    src={anime.poster}
                                    alt={anime.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* Info */}
                            <div className="p-3">
                                <h3 className="text-sm font-semibold line-clamp-2 text-white group-hover:text-purple-400 transition-colors duration-300">
                                    {anime.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Page;
