import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile({ isAuthenticated, user }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch bookings for the logged-in user
      const fetchBookings = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3001/api/bookings', {
            headers: {
              Authorization: `Bearer ${token}` // Add token to authorize the user
            }
          });
          setBookings(response.data);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };

      fetchBookings();
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return <p>Please log in to view your profile and booking history.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>{user ? `${user.name}'s Profile Page` : 'Profile Page'}</h2>
      <h3>Booking History</h3>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Service: {booking.service}</h5>
              <p className="card-text">Cleaner: {booking.cleaner}</p>
              <p className="card-text">Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p className="card-text">Status: {booking.status}</p>
            </div>
          </div>
        ))
      ) : (
        <p>You have no bookings at the moment.</p>
      )}
    </div>
  );
}

export default Profile;
