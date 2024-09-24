import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import DiscordChatbot from './components/DiscordChatbot.jsx';

const App = () => {
  return (
    <div className="relative min-h-screen">
      {/* Global Background Image */}
      <div className="relative min-h-screen bg-grimdark bg-cover bg-center">
      
      {/* Global Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Site Content */}
      <div className="relative z-10">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/discord" element={<DiscordChatbot />} />
          </Routes>
        </Router>
      </div>
    </div>
    </div>
  );
};

export default App;

