import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import PollList from './components/PollList';
import CreatePoll from './components/CreatePoll';
import PollDetail from './components/PollDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-frame">
          <header className="app-header">
            <div className="logo">
              <span className="flame">🔥</span>
              PollVote
            </div>
            <nav className="nav-links">
              <NavLink to="/" end>Polls</NavLink>
              <NavLink to="/create">Create Poll</NavLink>
            </nav>
          </header>

          <main className="app-body">
            <Routes>
              <Route path="/" element={<PollList />} />
              <Route path="/create" element={<CreatePoll />} />
              <Route path="/polls/:id" element={<PollDetail />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
