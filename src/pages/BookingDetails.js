import React from 'react';
import { useParams } from 'react-router-dom'; // Hook to get the booking ID from the URL

function BookingDetails() {
  const { id } = useParams(); // Get booking ID from URL

  // Simulating fetching booking details based on ID
  const bookings = [
    {
      id: 1,
      service: 'Deep Cleaning',
      cleaner: 'Jane Smith',
      date: '2024-09-12',
      status: 'Completed',
      details: 'Full house deep clean including kitchen, bathrooms, and floors.',
    },
    {
      id: 2,
      service: 'Regular Cleaning',
      cleaner: 'Tom Johnson',
      date: '2024-09-10',
      status: 'Pending',
      details: 'Weekly cleaning of living room, bedrooms, and bathrooms.',
    },
  ];

  const booking = bookings.find((booking) => booking.id === parseInt(id));

  return (
    <div className="booking-details-container">
      {booking ? (
        <>
          <h2>Booking Details</h2>
          <p><strong>Service:</strong> {booking.service}</p>
          <p><strong>Cleaner:</strong> {booking.cleaner}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <p><strong>Details:</strong> {booking.details}</p>
        </>
      ) : (
        <p>Booking not found.</p>
      )}
    </div>
  );
}

export default BookingDetails;
