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
                <h2 className="text-2xl font-semibold mb-4 text-blue-400 border-b border-blue-700 pb-2">
                    🔥 Ongoing Anime
                </h2>

                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
                    {ongoingAnime.map((anime, index) => (
                        <Link
                            href={`/anime/${anime.slug}`}
                            key={`ongoing-${index}`}
                            className="group block bg-gray-900 border border-gray-800 hover:border-blue-600 rounded-xl overflow-hidden shadow-md hover:shadow-blue-700/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative">
                                <Image
                                    src={anime.poster}
                                    alt={anime.title}
                                    width={250}
                                    height={350}
                                    unoptimized
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            </div>
                            <div className="p-3">
                                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                                    {anime.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Complete Anime */}
            <section>
                <h2 className="text-2xl font-semibold mb-4 text-purple-400 border-b border-purple-700 pb-2">
                    ✅ Complete Anime
                </h2>

                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
                    {completeAnime.map((anime, index) => (
                        <Link
                            href={`/anime/${anime.slug}`}
                            key={`complete-${index}`}
                            className="group block bg-gray-900 border border-gray-800 hover:border-purple-600 rounded-xl overflow-hidden shadow-md hover:shadow-purple-700/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative">
                                <Image
                                    src={anime.poster}
                                    alt={anime.title}
                                    width={250}
                                    height={350}
                                    unoptimized
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            </div>
                            <div className="p-3">
                                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-purple-400 transition-colors duration-200">
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
