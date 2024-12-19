import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Users from "./pages/users/Users";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import AddUser from "./pages/addUser/AddUser";
import EditUser from "./pages/editUser/EditUser";
import { initialData } from "./dummyData";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
    const [users, setUsers] = useState(initialData);
    const addUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };
    const deleteUser = (userId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };
    const updateUser = (updatedUser) => {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user)));
    };
    return (
        <BrowserRouter>
            <div style={{ minHeight: "100vh" }}>
                <Navbar />
                <div style={{ display: "flex", height: "100%" }}>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Users users={users} deleteUser={deleteUser} />} />{" "}
                        <Route path="/newUser" element={<AddUser addUser={addUser} />} />{" "}
                        <Route path="/editUser/:userId" element={<EditUser onSubmit={updateUser} />} />
                    </Routes>
                </div>
                <ToastContainer />
            </div>
        </BrowserRouter>
    );
}

export default App;
