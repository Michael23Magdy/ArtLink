import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CanvasPage from './pages/CanvasPage';
import HomePage from './pages/HomePage';
import { Buffer } from 'buffer';

window.global = window;
window.Buffer = Buffer;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Room/:id" element={<CanvasPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
