import React from "react";

const Table = ({ columns, data, showOptions, setShowOptions, popoverRef }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.field}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={row.id}>
                        {columns.map((column, colIndex) => {
                            if (column.field === "edit") {
                                return (
                                    <td key={colIndex}>
                                        {column.render
                                            ? column.render(row, rowIndex, showOptions, setShowOptions, popoverRef)
                                            : null}
                                    </td>
                                );
                            }

                            // Check if the field is "status" and render accordingly
                            if (column.field === "status") {
                                return (
                                    <td key={colIndex}>
                                        <span
                                            className={`status-pill ${
                                                row.status.toLowerCase() === "active" ? "active" : "inactive"
                                            }`}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                );
                            }

                            return <td key={colIndex}>{row[column.field]}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
