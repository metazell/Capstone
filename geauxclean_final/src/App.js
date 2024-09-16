import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import the Navbar
import Home from './pages/Home';
import Profile from './pages/Profile';
import Booking from './pages/Booking';
import BookingDetails from './pages/BookingDetails';

function App() {
  return (
    <Router>
      {/* Add the Navbar so it's visible on all pages */}
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
