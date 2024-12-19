// import React, { useState, useRef, useEffect } from "react";
// import "./singleSelectDropdown.css";

// const SingleSelectDropdown = ({ options, onSelect, placeholderText = "Select an option..." }) => {
//     const [selectedOption, setSelectedOption] = useState("");
//     const [filteredOptions, setFilteredOptions] = useState(options);
//     const [searchValue, setSearchValue] = useState("");
//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     const dropdownRef = useRef(null);
//     const inputRef = useRef(null);

//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setSearchValue(value);

//         const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
//         setFilteredOptions(filtered);
//     };

//     const handleOptionSelect = (option) => {
//         setSelectedOption(option);
//         setSearchValue(option);
//         setDropdownOpen(false);

//         if (onSelect) {
//             onSelect(option);
//         }
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen((prev) => !prev);
//     };

//     const handleOutsideClick = (e) => {
//         if (
//             dropdownRef.current &&
//             !dropdownRef.current.contains(e.target) &&
//             inputRef.current &&
//             !inputRef.current.contains(e.target)
//         ) {
//             setDropdownOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleOutsideClick);
//         return () => {
//             document.removeEventListener("mousedown", handleOutsideClick);
//         };
//     }, []);

//     return (
//         <div className="single-select-dropdown">
//             <div className="input-container">
//                 <input
//                     ref={inputRef}
//                     type="text"
//                     value={searchValue}
//                     onChange={handleInputChange}
//                     onFocus={() => setDropdownOpen(true)}
//                     placeholder={placeholderText}
//                 />
//                 <span className="dropdown-toggle" onClick={toggleDropdown}>
//                     &#9662;
//                 </span>
//             </div>

//             {dropdownOpen && (
//                 <ul ref={dropdownRef} className="dropdown">
//                     {filteredOptions.length > 0 ? (
//                         filteredOptions.map((option, index) => (
//                             <li key={index} onClick={() => handleOptionSelect(option)}>
//                                 {option}
//                             </li>
//                         ))
//                     ) : (
//                         <li className="no-options">No options available</li>
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default SingleSelectDropdown;
import React, { useState, useRef, useEffect } from "react";
import "./singleSelectDropdown.css";

const SingleSelectDropdown = ({ options, onSelect, placeholderText = "Select an option...", selectedOption = "" }) => {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [searchValue, setSearchValue] = useState(selectedOption);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setSearchValue(selectedOption); // Update search value when selectedOption changes
    }, [selectedOption]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
        setFilteredOptions(filtered);
    };

    const handleOptionSelect = (option) => {
        setSearchValue(option);
        setDropdownOpen(false);
        if (onSelect) {
            onSelect(option);
        }
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
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="single-select-dropdown">
            <div className="input-container">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    onFocus={() => setDropdownOpen(true)}
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
                            <li key={index} onClick={() => handleOptionSelect(option)}>
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

export default SingleSelectDropdown;
