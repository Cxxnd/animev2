import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api }) => {
    const animeData = api?.data?.anime || api?.data || [];
    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {animeData.map((anime, index) => (
                <Link
                    href={`/anime/${anime.slug}`}
                    className="group bg-zinc-900/70 hover:bg-zinc-800 transition-all rounded-xl overflow-hidden border border-zinc-800 shadow-lg"
                    key={index}
                >
                    <div className="relative w-full h-[380px]">
                        <Image
                            src={anime.poster}
                            alt={anime.title}
                            fill
                            sizes="(max-width:768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>

                    <div className="p-3">
                        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                            {anime.title}
                        </h3>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AnimeList;
