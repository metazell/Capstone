import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Schedule.css'; // Add your styles here

const Schedule = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Fetched bookings:', response.data.bookings); // Log fetched bookings for debugging
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="schedule-container">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map(booking => (
          <div key={booking.id} className="booking-item">
            <h3>Service: {booking.Service.name}</h3>  {/* Display Service name */}
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Status: {booking.status}</p>
            <button onClick={() => handleDelete(booking.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Schedule;
