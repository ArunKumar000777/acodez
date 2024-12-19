import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination/Pagination";
import "../../App.css";
import "./users.css";

const Users = ({ users, deleteUser }) => {
    const columns = [
        { header: "User", field: "username" },
        { header: "Age", field: "age" },
        { header: "Leagues played", field: "leagues" },
        { header: "Status", field: "status" },
        { header: "Height", field: "height" },
        { header: "Position", field: "position" },
        {
            header: "_",
            field: "edit",
            render: (row, index, showOptions, setShowOptions, popoverRef) => {
                return (
                    <div className="edit-icon-container">
                        <span
                            onClick={() => setShowOptions((prev) => (prev === index ? null : index))}
                            className="edit-icon"
                        >
                            <img src="/icons/dots.png" alt="dot-icon" width="15px" />
                        </span>
                        {showOptions === index && (
                            <div ref={popoverRef} className="edit-options-box">
                                <Link to={`/editUser/${row.id}`} state={{ user: row }} className="edit-option">
                                    <img src="/icons/pencil.png" alt="pencil-icon" width="15px" height="15px" />
                                    Edit
                                </Link>
                                <div className="delete-option" onClick={() => handleDelete(row.id)}>
                                    <img src="/icons/trash.png" alt="" width="20px" height="20px" />
                                    <button className="del-btn">Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            },
        },
    ];
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(users);
    const [showOptions, setShowOptions] = useState(null);
    const popoverRef = useRef(null);

    const { currentPage, totalPages, currentData, nextPage, prevPage, goToPage } = usePagination(filteredData, 5);

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filtered = users.filter((row) => {
            return Object.values(row)
                .flat()
                .some((value) => String(value).toLowerCase().includes(lowerCaseSearchTerm));
        });

        setFilteredData(filtered);
    }, [searchTerm, users]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setShowOptions(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDelete = (userId) => {
        alert("Are you sure you want to delete");
        deleteUser(userId);
        setShowOptions(null);
    };

    return (
        <div className="user-section">
            <h1 className="title">User management</h1>
            <div className="input-btn-box">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to="/newUser" className="btn btn-primary-outline">
                    New
                </Link>
            </div>
            <Table
                columns={columns}
                data={currentData}
                showOptions={showOptions}
                setShowOptions={setShowOptions}
                popoverRef={popoverRef}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                nextPage={nextPage}
                prevPage={prevPage}
                goToPage={goToPage}
                totalItems={filteredData.length}
                itemsPerPage={5}
            />
        </div>
    );
};

export default Users;
