import { getAnime } from "@/libs/service-api";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }) => {
    const { slug } = await params;
    const anime = await getAnime({ resource: `anime/${slug}` });
    const data = anime?.data;

    if (!data)
        return (
            <p className="text-center text-gray-300">Data tidak ditemukan.</p>
        );

    return (
        <div className="max-w-6xl mx-auto p-4 text-gray-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 border border-gray-800 bg-gray-900/50 p-4 rounded-xl">
                {/* Poster */}
                <div className="flex-shrink-0">
                    <Image
                        src={data.poster}
                        alt={data.title}
                        width={250}
                        height={350}
                        className="rounded-xl object-cover shadow-lg"
                    />
                </div>

                {/* Info Anime */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-400">
                            {data.title}
                        </h1>
                        <p className="italic text-gray-400">
                            {data.japanese_title}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-sm">
                            <p>
                                <span className="font-medium text-gray-300">
                                    Rating:
                                </span>{" "}
                                {data.rating}
                            </p>
                            <p>
                                <span className="font-medium text-gray-300">
                                    Studio:
                                </span>{" "}
                                {data.studio}
                            </p>
                            <p>
                                <span className="font-medium text-gray-300">
                                    Tipe:
                                </span>{" "}
                                {data.type}
                            </p>
                            <p>
                                <span className="font-medium text-gray-300">
                                    Status:
                                </span>{" "}
                                {data.status}
                            </p>
                            <p>
                                <span className="font-medium text-gray-300">
                                    Episode:
                                </span>{" "}
                                {data.episode_count}
                            </p>
                            <p>
                                <span className="font-medium text-gray-300">
                                    Durasi:
                                </span>{" "}
                                {data.duration}
                            </p>
                            <p>
                                <span className="font-medium text-gray-300">
                                    Rilis:
                                </span>{" "}
                                {data.release_date}
                            </p>
                            <p>
                                <span className="font-medium text-gray-300">
                                    Produser:
                                </span>{" "}
                                {data.produser}
                            </p>
                        </div>

                        {/* Genres */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {data.genres.map((genre, index) => (
                                <Link
                                    key={index}
                                    href={`/genre/${genre.slug}`}
                                    className="px-3 py-1 text-sm bg-blue-700/30 hover:bg-blue-700/50 rounded-full transition"
                                >
                                    {genre.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sinopsis */}
            <div className="mt-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                <h2 className="text-xl font-semibold text-blue-400 mb-2">
                    Sinopsis
                </h2>
                <p className="text-gray-300 leading-relaxed text-justify">
                    {data.synopsis}
                </p>
            </div>

            {/* Daftar Episode */}
            <div className="mt-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                <h2 className="text-xl font-semibold text-blue-400 mb-3">
                    Daftar Episode
                </h2>
                <ul className="space-y-2">
                    {data.episode_lists.map((ep, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-gray-800/50 hover:bg-gray-800 p-3 rounded-lg transition"
                        >
                            <Link
                                href={`/episode/${ep.slug}`}
                                className="font-medium hover:text-blue-400"
                            >
                                {ep.episode}
                            </Link>
                            <span className="text-sm text-gray-400">
                                Ep {ep.episode_number}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Batch Section */}
            {data.batch && (
                <div className="mt-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                    <h2 className="text-xl font-semibold text-blue-400 mb-2">
                        Batch
                    </h2>
                    <Link
                        href={data.batch.otakudesu_url}
                        target="_blank"
                        className="text-blue-400 hover:underline"
                    >
                        {data.batch.slug}
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">
                        Diupload pada {data.batch.uploaded_at}
                    </p>
                </div>
            )}

            {/* Rekomendasi */}
            {data.recommendations?.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-blue-400 mb-4">
                        Rekomendasi Anime
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {data.recommendations.map((rec, index) => (
                            <Link
                                key={index}
                                href={`/anime/${rec.slug}`}
                                className="group relative"
                            >
                                <Image
                                    src={rec.poster}
                                    alt={rec.title}
                                    width={200}
                                    height={280}
                                    className="rounded-lg object-cover group-hover:opacity-80 transition"
                                />
                                <p className="text-sm mt-2 text-center group-hover:text-blue-400 transition">
                                    {rec.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
