import Image from "next/image";
import { getAnime } from "@/libs/service-api";

const Page = async ({ params }) => {
    const { slug } = params;

    // Ambil data anime dari API
    const res = await getAnime({ resource: `batch/${slug}` });

    // Sesuaikan dengan struktur API kamu
    const data = res?.data || res || {};

    // Jika data kosong
    if (!data || !data.poster) {
        return (
            <main className="p-10 text-center text-gray-400">
                <h2>Anime tidak ditemukan 😢</h2>
            </main>
        );
    }

    return (
        <main className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Header Anime */}
            <section className="flex flex-col md:flex-row gap-6 items-start">
                {/* Poster */}
                <Image
                    src={data.poster}
                    alt={data.title || "Anime"}
                    width={260}
                    height={360}
                    className="rounded-2xl shadow-lg"
                    priority
                />

                {/* Info */}
                <div className="flex-1 space-y-2">
                    <h1 className="text-3xl font-bold">{data.title}</h1>
                    <p className="text-gray-400 italic">{data.japanese}</p>

                    <ul className="text-sm text-gray-300 space-y-1 mt-2">
                        <li>
                            <b>Type:</b> {data.type}
                        </li>
                        <li>
                            <b>Episodes:</b> {data.episodes}
                        </li>
                        <li>
                            <b>Duration:</b> {data.duration}
                        </li>
                        <li>
                            <b>Score:</b> ⭐ {data.score}
                        </li>
                        <li>
                            <b>Studios:</b> {data.studios}
                        </li>
                        <li>
                            <b>Aired:</b> {data.aired}
                        </li>
                        <li>
                            <b>Credit:</b> {data.credit}
                        </li>
                    </ul>

                    {/* Genre */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {data.genreList?.map((genre, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs"
                            >
                                {genre.title}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Download Batch Section */}
            <section className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl">
                <h2 className="text-xl font-semibold mb-5">
                    Download Batch Subtitle Indonesia
                </h2>

                {data.downloadUrl?.formats?.map((format, i) => (
                    <div key={i} className="space-y-5">
                        <h3 className="text-base font-bold">{format.title}</h3>

                        {format.qualities.map((quality, j) => (
                            <div
                                key={j}
                                className="border border-gray-700 rounded-xl p-4 space-y-2 bg-gray-950/50"
                            >
                                <div className="flex justify-between text-sm text-gray-300">
                                    <span className="font-semibold">
                                        {quality.title}
                                    </span>
                                    <span>{quality.size}</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {quality.urls.map((link, k) => (
                                        <a
                                            key={k}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs bg-blue-600 hover:bg-blue-700 transition px-3 py-1 rounded-md"
                                        >
                                            {link.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Page;
