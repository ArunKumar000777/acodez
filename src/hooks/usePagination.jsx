import { useState } from "react";

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => goToPage(currentPage + 1);
    const prevPage = () => goToPage(currentPage - 1);

    // Slice data to show only items for the current page
    const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return {
        currentPage,
        totalPages,
        currentData,
        nextPage,
        prevPage,
        goToPage,
    };
};

export default usePagination;
