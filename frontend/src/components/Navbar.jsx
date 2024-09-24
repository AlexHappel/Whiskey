import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-black p-4 shadow-md border-b-2 border-gold">
            <ul className="flex justify-between items-center text-xl font-gothic">
                <li>
                    <Link 
                        className="text-gold hover:text-deepPurple transition duration-300" 
                        to="/"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        className="text-gold hover:text-deepPurple transition duration-300" 
                        to="/leaderboard"
                    >
                        Leaderboard
                    </Link>
                </li>
                <li>
                    <Link 
                        className="text-gold hover:text-deepPurple transition duration-300" 
                        to="/discord"
                    >
                        Discord
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;