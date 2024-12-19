import React, { useState, useEffect, useRef } from "react";
import "./multiSelectDropdown.css";

const MultiSelectDropdown = ({ options, onChange, placeholderText = "Select options...", selectedTags = [] }) => {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [searchValue, setSearchValue] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        const filtered = options.filter(
            (option) => option.toLowerCase().includes(value.toLowerCase()) && !selectedTags.includes(option)
        );
        setFilteredOptions(filtered);
    };

    const handleTagSelect = (tag) => {
        if (!selectedTags.includes(tag)) {
            const newTags = [...selectedTags, tag];
            onChange(newTags);
            setSearchValue("");
            setDropdownOpen(false);
        }
    };

    const handleTagRemove = (tag) => {
        const newTags = selectedTags.filter((t) => t !== tag);
        onChange(newTags);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleOutsideClick = (e) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target) &&
            inputRef.current &&
            !inputRef.current.contains(e.target)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (searchValue === "") {
            setFilteredOptions(options);
        } else {
            const filtered = options.filter(
                (option) => option.toLowerCase().includes(searchValue.toLowerCase()) && !selectedTags.includes(option)
            );
            setFilteredOptions(filtered);
        }
    }, [searchValue, selectedTags, options]);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="multi-select-dropdown">
            <div className="input-container">
                {selectedTags.map((tag, index) => (
                    <div key={index} className="tag">
                        {tag}
                        <span className="remove-tag" onClick={() => handleTagRemove(tag)}>
                            &times;
                        </span>
                    </div>
                ))}

                <input
                    ref={inputRef}
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    onFocus={toggleDropdown}
                    placeholder={placeholderText}
                />
                <span className="dropdown-toggle" onClick={toggleDropdown}>
                    &#9662;
                </span>
            </div>

            {dropdownOpen && (
                <ul ref={dropdownRef} className="dropdown">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <li key={index} onClick={() => handleTagSelect(option)}>
                                {option}
                            </li>
                        ))
                    ) : (
                        <li className="no-options">No options available</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
