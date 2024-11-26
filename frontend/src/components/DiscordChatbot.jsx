import React from "react";

const DiscordChatbot = () => {
    return (
        <div className="bg-black p-6 text-center text-gold font-gothic min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold mb-6">Join the Discord and Chat with Our Bot</h2>
            <a
                href="https://discord.gg/"
                className="bg-deepPurple hover:bg-gold text-white font-bold py-3 px-6 rounded-gothic transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
            >
                Join Discord
            </a>
        </div>
    );
};

export default DiscordChatbot;