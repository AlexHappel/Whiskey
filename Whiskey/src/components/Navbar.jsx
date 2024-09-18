import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-between items-center">
                <li><Link className="text-white" to="/">Home</Link></li>
                <li><Link className="text-white" to="/leaderboard">Leaderboard</Link></li>
                <li><Link className="text-white" to="discord">Discord</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;