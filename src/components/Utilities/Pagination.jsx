"use client";
const Pagination = ({ page, lastPage, setPage }) => {
    const goToPage = (num) => {
        if (num >= 1 && num <= lastPage) setPage(num);
    };

    const pagesToShow = () => {
        const pages = [];
        const maxVisible = 5;

        if (lastPage <= maxVisible + 2) {
            for (let i = 1; i <= lastPage; i++) pages.push(i);
        } else {
            pages.push(1);

            if (page > 3) pages.push("...");

            const start = Math.max(2, page - 1);
            const end = Math.min(lastPage - 1, page + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (page < lastPage - 2) pages.push("...");

            pages.push(lastPage);
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-6 space-x-2 text-sm">
            <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
                Prev
            </button>

            {pagesToShow().map((num, index) =>
                num === "..." ? (
                    <span key={index} className="px-2">
                        ...
                    </span>
                ) : (
                    <button
                        key={index}
                        onClick={() => goToPage(num)}
                        className={`px-3 py-1 border rounded transition ${
                            page === num
                                ? "bg-blue-500 text-white border-blue-500"
                                : "hover:bg-blue-100"
                        }`}
                    >
                        {num}
                    </button>
                )
            )}

            <button
                onClick={() => goToPage(page + 1)}
                disabled={page === lastPage}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
                Next
            </button>
        </div>
    );
};
export default Pagination;
