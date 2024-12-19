import React, { useState } from "react";
import "./addUser.css";
import MultiSelectDropdown from "../../components/multiSelectDropdaown/MultiSelectDropdown";
import SingleSelectDropdown from "../../components/singleSelectDropdown/SingleSelectDropdown";
import { toast } from "react-toastify";

const options = ["Laliga", "League1", "League2"];
const positions = ["forward", "backward", "midfielder"];
const status = ["active", "retired"];

const AddUser = ({ addUser }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const notify = () => toast("User added successfully");

    const handleNameChange = (e) => setName(e.target.value);
    const handleAgeChange = (e) => setAge(e.target.value);
    const handleHeightChange = (e) => setHeight(e.target.value);

    const handleStatusSelect = (option) => {
        console.log("Selected Status:", option);
        setSelectedStatus(option);
    };

    const handlePositionSelect = (option) => {
        console.log("Selected Position:", option);
        setSelectedPosition(option);
    };

    const handleSelectedTagsChange = (selectedTags) => {
        console.log("Selected Tags:", selectedTags);
        setSelectedTags(selectedTags);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: name,
            age,
            height,
            position: selectedPosition,
            leagues: selectedTags,
            status: selectedStatus,
        };
        addUser(newUser);
        setName("");
        setAge("");
        setHeight("");
        setSelectedStatus("");
        setSelectedPosition("");
        setSelectedTags([]);
        notify();
    };

    return (
        <div className="add-user-section">
            <h2 className="title">User information form</h2>
            <form onSubmit={handleSubmit}>
                <div className="first-row">
                    <input type="text" placeholder="Enter the name" value={name} onChange={handleNameChange} />
                    <input type="number" placeholder="Enter the age" value={age} onChange={handleAgeChange} />
                </div>
                <div className="second-row">
                    <MultiSelectDropdown
                        options={options}
                        selectedTags={selectedTags}
                        onChange={handleSelectedTagsChange}
                        placeholderText="Leagues played"
                    />
                    <SingleSelectDropdown options={status} onSelect={handleStatusSelect} placeholderText="status" />
                </div>
                <div className="third-row">
                    <input type="number" placeholder="height" value={height} onChange={handleHeightChange} />
                    <SingleSelectDropdown options={positions} onSelect={handlePositionSelect} placeholderText="position" />
                </div>
                <div className="submit-btn-box">
                    <button type="submit" className="btn btn-primary">
                        submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
