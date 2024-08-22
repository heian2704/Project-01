import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import HighlightedCars from './pages/HighlightedCars';
import NotFound from './pages/NotFound';
import NavigationBar from './components/NavigationBar'; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/highlighted" element={<HighlightedCars />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
