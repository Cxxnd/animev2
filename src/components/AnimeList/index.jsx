import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const AnimeList = ({ api }) => {
    const animeData = api?.data?.anime || api?.data || api || [];

    return (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {animeData.map((anime, index) => (
                <Link
                    href={`/anime/${anime.slug}`}
                    key={index}
                    className="group rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 transition-all shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                >
                    {/* Gambar */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                        <Image
                            src={anime.poster}
                            alt={anime.title}
                            fill
                            sizes="(max-width:768px) 100vw, 33vw"
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        {/* Rating */}
                        {anime.rating && (
                            <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm">
                                <Star className="w-3 h-3 text-yellow-400" />
                                {anime.rating}
                            </div>
                        )}
                    </div>

                    {/* Konten */}
                    <div className="p-3 flex flex-col justify-between h-[110px]">
                        <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                            {anime.title}
                        </h3>

                        <div className="mt-2 text-xs text-gray-400 space-y-1">
                            <p>
                                <span className="text-blue-400">
                                    {anime.season}
                                </span>{" "}
                                • {anime.studio || "-"}
                            </p>
                            <p>
                                Ep:{" "}
                                <span className="text-gray-300 font-medium">
                                    {anime.episode_count || "?"}
                                </span>
                            </p>
                            {/* Genre 3 pertama */}
                            <div className="flex flex-wrap gap-1">
                                {anime.genres?.slice(0, 3).map((genre, i) => (
                                    <span
                                        key={i}
                                        className="bg-zinc-800/70 text-gray-300 text-[10px] px-2 py-[2px] rounded-md"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AnimeList;
