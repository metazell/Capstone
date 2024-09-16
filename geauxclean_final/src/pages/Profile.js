import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Homeowner',
  });

  const [bookings, setBookings] = useState([
    { id: 1, service: 'Deep Cleaning', cleaner: 'Jane Smith', date: '2024-09-12', status: 'Completed' },
    { id: 2, service: 'Regular Cleaning', cleaner: 'Tom Johnson', date: '2024-09-10', status: 'Pending' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Handle Search Input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Filter Status
  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
  };

  // Filtered and searched bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesService = booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
    return matchesService && matchesStatus;
  });

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>

      {/* Search and Filter */}
      <div className="search-filter-container">
        <input
          type="text"
          className="form-control"
          placeholder="Search by service..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <select className="form-control" value={filterStatus} onChange={handleFilterStatus}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Booking History */}
      <div className="booking-history">
        <h3>Booking History</h3>
        {filteredBookings.length > 0 ? (
          <ul className="list-group">
            {filteredBookings.map((booking) => (
              <li key={booking.id} className="list-group-item">
                <strong>Service:</strong> {booking.service} <br />
                <strong>Cleaner:</strong> {booking.cleaner} <br />
                <strong>Date:</strong> {booking.date} <br />
                <strong>Status:</strong> {booking.status} <br />
                <Link to={`/bookings/${booking.id}`} className="btn btn-secondary btn-sm">
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
