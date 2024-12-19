import React, { useState } from "react";
import "./Sidebar.css";

const menuItems = [
    {
        title: "List item",
        subItems: ["list item", "list item", "list item"],
    },
];
const Sidebar = () => {
    const [expanded, setExpanded] = useState(null);

    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <aside className="sidebar">
            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <li key={index} className="sidebar-item">
                        {/* Main Item */}
                        <div className="sidebar-main-item" onClick={() => toggleExpand(index)}>
                            {item.title}
                            <span className="arrow">{expanded === index ? "▲" : "▼"}</span>
                        </div>

                        {expanded === index && (
                            <ul className="sidebar-submenu">
                                {item.subItems.map((subItem, subIndex) => (
                                    <li key={subIndex} className={`sidebar-sub-item ${subIndex === 0 ? "highlight" : ""}`}>
                                        {subItem}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
