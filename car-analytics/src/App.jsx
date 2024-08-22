import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/DashBoard'; // Ensure this path is correct
import HighlightedCars from './pages/HighlightedCars';
import NotFound from './pages/NotFound';
import NavigationBar from './components/NavigationBar'; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/* Redirect from / to /dashboard */}
        <Route path="/Project-01" element={<Navigate to="/dashboard" />} />
        
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Highlighted Cars Route */}
        <Route path="/highlighted" element={<HighlightedCars />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
