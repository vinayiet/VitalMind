import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MoodCheck from './pages/MoodCheck';
import MoodHistory from './pages/MoodHistory';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 to-emerald-50 text-slate-800">
        <header className="w-full py-4 shadow-sm bg-white/70 backdrop-blur sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-semibold text-emerald-600 tracking-tight">MindCare</Link>
            <nav className="space-x-4 text-sm font-medium">
              <Link to="/mood" className="hover:text-emerald-600">Mood Check</Link>
              <Link to="/history" className="hover:text-emerald-600">History</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/mood" element={<MoodCheck />} />
            <Route path="/history" element={<MoodHistory />} />
          </Routes>
        </main>
        <footer className="py-6 text-center text-xs text-slate-500">
          Built with care for Indian students. Not a substitute for professional help.
        </footer>
      </div>
    </Router>
  );
}

export default App;
