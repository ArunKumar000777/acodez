// import React from "react";

// const Table = ({ columns, data }) => {
//     return (
//         <table>
//             <thead>
//                 <tr>
//                     {columns?.map((col) => (
//                         <th key={col.field}>{col.header}</th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((row, rowIndex) => (
//                     <tr key={rowIndex}>
//                         {columns.map((column) => (
//                             <td key={column.field}>{column.render ? column.render(row) : row[column.field]}</td>
//                         ))}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default Table;

// import React from "react";

// const Table = ({ columns, data, showOptions, setShowOptions }) => {
//     return (
//         <table>
//             <thead>
//                 <tr>
//                     {columns.map((column) => (
//                         <th key={column.field}>{column.header}</th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((row, rowIndex) => (
//                     <tr key={row.id}>
//                         {columns.map((column, colIndex) => {
//                             if (column.field === "edit") {
//                                 return (
//                                     <td key={colIndex}>
//                                         {column.render ? column.render(row, rowIndex, showOptions, setShowOptions) : null}
//                                     </td>
//                                 );
//                             }
//                             return <td key={colIndex}>{row[column.field]}</td>;
//                         })}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

// export default Table;
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
                            return <td key={colIndex}>{row[column.field]}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
