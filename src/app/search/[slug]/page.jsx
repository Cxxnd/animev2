import AnimeList from "@/components/AnimeList";
import ButtonBack from "@/components/Navbar/ButtonBack";
import LoadingSkeleton from "@/components/Utilities/LoadingSkeleton";

const Page = async ({ params }) => {
    const { slug } = await params;
    const decoded = decodeURIComponent(slug);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/${decoded}`;

    try {
        const response = await fetch(apiUrl, {
            next: { revalidate: 120 },
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            },
        });

        if (!response.ok) {
            throw new Error(`Fetch gagal: ${response.status}`);
        }

        const data = await response.json();
        const results = data.search_results || [];

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
        console.error("Error di search:", error.message);
        return (
            <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-400">
                <p>Terjadi kesalahan: {error.message}</p>
            </section>
        );
    }
};

export default Page;
