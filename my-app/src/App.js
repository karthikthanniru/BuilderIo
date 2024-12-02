// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CatchAllRoute from './CatchAllRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<CatchAllRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
