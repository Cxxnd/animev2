import { getAnime } from "@/libs/service-api";
import Link from "next/link";
import ButtonBack from "@/components/Navbar/ButtonBack";

const Page = async ({ params }) => {
    const { slug } = await params;
    const episode = await getAnime({ resource: `episode/${slug}` });

    const data = episode?.data;
    const downloads = data?.download_urls;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-10">
            <div className="max-w-6xl mx-auto space-y-10">
                <ButtonBack />
                {/* Header Episode */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400">
                        {data.episode}
                    </h1>
                    <p className="text-gray-400 mt-2">Website Create by Faza</p>
                </div>

                {/* Video Player */}
                <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg border border-gray-700">
                    <iframe
                        src={data.stream_url}
                        className="w-full h-full border-0"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Navigasi Episode */}
                <div className="flex justify-between items-center">
                    {data.has_previous_episode ? (
                        <Link
                            href={`/episode/${data.previous_episode.slug}`}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                        >
                            ⬅️ Sebelumnya
                        </Link>
                    ) : (
                        <div></div>
                    )}
                    {data.has_next_episode && (
                        <Link
                            href={`/episode/${data.next_episode.slug}`}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                        >
                            Selanjutnya ➡️
                        </Link>
                    )}
                </div>

                {/* Info Anime */}
                <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">
                        🎬 Info Anime
                    </h2>
                    <p className="text-gray-300 mb-2">
                        <span className="font-semibold text-white">Judul:</span>{" "}
                        {(() => {
                            try {
                                const parts = data.anime.slug.split("/");
                                const lastPart = parts.filter(Boolean).pop();
                                return lastPart.replace(/-/g, " ");
                            } catch {
                                return "Tidak diketahui";
                            }
                        })()}
                    </p>
                    <p className="text-gray-300">
                        <span className="font-semibold text-white">
                            Episode:
                        </span>{" "}
                        {data.episode}
                    </p>
                </div>

                {/* Tombol Download */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-blue-400">
                        💾 Download Links
                    </h2>

                    {Object.entries(downloads).map(([format, list]) => (
                        <div key={format}>
                            <h3 className="text-xl capitalize mb-2 font-semibold text-gray-200">
                                Format {format}
                            </h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {list.map((res) => (
                                    <div
                                        key={res.resolution}
                                        className="bg-gray-800 p-4 rounded-xl border border-gray-700"
                                    >
                                        <h4 className="text-lg font-bold text-blue-300 mb-2">
                                            {res.resolution}
                                        </h4>
                                        <div className="space-y-2">
                                            {res.urls.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    className="block bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm text-center transition"
                                                >
                                                    {link.provider}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
