import "./pagination.css";

const Pagination = ({ currentPage, totalPages, nextPage, prevPage, goToPage, totalItems, itemsPerPage }) => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

    return (
        <div className="pagination">
            <div className="pagination-summary">
                <div>
                    Showing {startIndex}-{endIndex} of {totalItems}
                </div>
                <div className="btn-box">
                    <div onClick={prevPage} disabled={currentPage === 1}>
                        &#60;
                    </div>
                    <div onClick={nextPage} disabled={currentPage === totalPages}>
                        &#62;
                    </div>
                </div>
            </div>

            {/* <div></div> */}

            {/* <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
            </button>

            {[...Array(totalPages).keys()].map((num) => (
                <button key={num + 1} onClick={() => goToPage(num + 1)} className={num + 1 === currentPage ? "active" : ""}>
                    {num + 1}
                </button>
            ))}

            <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
            </button> */}
        </div>
    );
};

export default Pagination;
