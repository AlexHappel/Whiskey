import React from "react";

const Home = () => {
    return (
        <div className="bg-black min-h-screen flex flex-col justify-center items-center text-center p-6 text-gold relative">
            <div className="relative z-10">
                <h1 className="text-5xl font-bold mb-6 font-gothic">Welcome to the Whiskey Reclusiam!</h1>
                <p className="text-xl mb-4">Join our Discord, check out the leaderboard, or submit your scores.</p>
                <p className="text-deepPurple font-semibold">The darkest corners of the Imperium await you...</p>
            </div>
        </div>
    );
};

export default Home;
