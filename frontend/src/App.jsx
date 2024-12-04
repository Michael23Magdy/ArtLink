import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CanvasPage from './pages/CanvasPage';
import HomePage from './pages/HomePage';
import { Buffer } from 'buffer';
import NotCompatible from './pages/NotCompatible';

window.global = window;
window.Buffer = Buffer;


function NavigationHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Detect if the device does not have a mouse or precise pointing device
    const noMouse = !window.matchMedia("(pointer: fine)").matches;

    if (noMouse) {
      navigate("/not-compatible"); // Redirect to the NotCompatible page
    }
  }, [navigate]);

  return null; // This component doesn't render anything
}

function App() {
  return (
    <Router>
      <NavigationHandler />
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Room/:id" element={<CanvasPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/not-compatible" element={<NotCompatible />} />
      </Routes>
    </Router>
  );
}

export default App;
