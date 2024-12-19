import React, { useState, useEffect } from "react";
import "../addUser/addUser.css";
import MultiSelectDropdown from "../../components/multiSelectDropdaown/MultiSelectDropdown";
import SingleSelectDropdown from "../../components/singleSelectDropdown/SingleSelectDropdown";
import { useLocation, useNavigate } from "react-router-dom";

const options = ["Laliga", "League1", "League2"];
const positions = ["forward", "backward", "midfielder"];
const status = ["active", "retired"];

const EditUser = ({ onSubmit }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location?.state || {};

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        if (user) {
            setName(user.username || "");
            setAge(user.age || "");
            setHeight(user.height || "");
            setSelectedStatus(user.status || "");
            setSelectedPosition(user.position || "");
            setSelectedTags(user.leagues || []);
        }
    }, [user]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleAgeChange = (e) => setAge(e.target.value);
    const handleHeightChange = (e) => setHeight(e.target.value);

    const handleStatusSelect = (option) => setSelectedStatus(option);
    const handlePositionSelect = (option) => setSelectedPosition(option);
    const handleSelectedTagsChange = (selectedTags) => setSelectedTags(selectedTags);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            id: user.id,
            username: name,
            age,
            height,
            position: selectedPosition,
            leagues: selectedTags,
            status: selectedStatus,
        };

        if (onSubmit) {
            onSubmit(updatedUser);
        }
        navigate("/");
    };

    if (!user) {
        return <div>Loading or user not found...</div>;
    }

    return (
        <div className="add-user-section">
            <h2 className="title">{user ? "Edit User" : "User information form"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="first-row">
                    <input type="text" placeholder="Enter the name" value={name} onChange={handleNameChange} />
                    <input type="number" placeholder="Enter the age" value={age} onChange={handleAgeChange} />
                </div>
                <div className="second-row">
                    <MultiSelectDropdown
                        options={options}
                        onChange={handleSelectedTagsChange}
                        placeholderText="Leagues played"
                        selectedTags={selectedTags}
                    />
                    <SingleSelectDropdown
                        options={status}
                        onSelect={handleStatusSelect}
                        placeholderText="status"
                        selectedOption={selectedStatus}
                    />
                </div>
                <div className="third-row">
                    <input type="number" placeholder="height" value={height} onChange={handleHeightChange} />
                    <SingleSelectDropdown
                        options={positions}
                        onSelect={handlePositionSelect}
                        placeholderText="position"
                        selectedOption={selectedPosition}
                    />
                </div>
                <div className="submit-btn-box">
                    <button type="submit" className="btn btn-primary">
                        {user ? "Update" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
