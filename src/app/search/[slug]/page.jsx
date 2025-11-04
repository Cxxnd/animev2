import AnimeList from "@/components/AnimeList";
import { getAnime } from "@/libs/service-api";
import ButtonBack from "@/components/Navbar/ButtonBack";

const Page = async ({ params }) => {
    try {
        const { slug } = await params;
        const decoded = decodeURIComponent(slug);

        // Ambil data dari API
        const data = await getAnime({ resource: `search/${decoded}` });

        // Pastikan hasilnya ada dan punya list
        const results = data?.data || data?.results || [];

        return (
            <section className="min-h-screen px-6 py-8 bg-gray-900 text-white">
                <div className="mb-6">
                    <ButtonBack />
                </div>

                {results.length === 0 ? (
                    <p className="text-gray-400">
                        Tidak ditemukan hasil untuk{" "}
                        <span className="italic">"{decoded}"</span>.
                    </p>
                ) : (
                    <AnimeList api={results} />
                )}
            </section>
        );
    } catch (error) {
        console.error("Error di search:", error?.message || error);
        return (
            <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-400">
                <p>Terjadi kesalahan: {error.message}</p>
            </section>
        );
    }
};

export default Page;
