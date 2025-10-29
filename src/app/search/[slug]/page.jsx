import { getAnime } from "@/libs/service-api";
import AnimeList from "@/components/AnimeList";

const Page = async ({ params }) => {
    const { slug } = await params;
    const decoded = decodeURIComponent(slug);
    const searchResult = await getAnime(`/search/${decoded}`);

    return (
        <section className="min-h-screen px-6 py-8 bg-gray-900 text-white">
            <h1 className="text-2xl font-semibold mb-6 text-color-primary">
                Hasil Pencarian Anime:{" "}
                <span className="capitalize">{decoded}</span>
            </h1>

            <AnimeList api={searchResult} />
        </section>
    );
};

export default Page;
