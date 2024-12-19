import React from "react";
import "./navbar.css";

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: "dodgerblue", height: "60px", marginBottom: "20px" }}>
            <div className="icon-logo-box">
                <img src="/icons/hamburger.svg" alt="" width="20px" height="20px" />
                <h3>Typograghy</h3>
            </div>
            <div className="favorite-profile-icon">
                <div>star</div>
                <div className="profile-icon">AR</div>
            </div>
        </nav>
    );
};

export default Navbar;
