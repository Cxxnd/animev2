"use client";

const LoadingSkeleton = () => {
    const skeletons = Array(12).fill(0);

    return (
        <section className="min-h-screen px-6 py-8 bg-gray-900">
            <div className="mb-6">
                <div className="w-24 h-6 rounded-md shimmer" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {skeletons.map((_, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-xl overflow-hidden shimmer"
                    >
                        <div className="aspect-[3/4] bg-gray-700 shimmer" />
                        <div className="p-3 space-y-2">
                            <div className="h-4 rounded w-3/4 bg-gray-700 shimmer" />
                            <div className="h-3 rounded w-1/2 bg-gray-700 shimmer" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LoadingSkeleton;
