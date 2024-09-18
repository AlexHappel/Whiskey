import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components';
import Home from './pages/Home';
import Leaderboard from './components/Leaderboard';
import DiscordChatbot from './components/DiscordChatbot';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/discord" element={<DiscordChatbot/>} />
      </Routes>
    </Router>
  );
}

export default App;
