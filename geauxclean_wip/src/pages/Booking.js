import React, { useState } from 'react';
import axios from 'axios';

function Booking() {
  // State to manage form input
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      service,
      date,
      time,
      notes,
    };

    try {
      // Send the booking data to the backend
      const response = await axios.post('http://localhost:3001/api/bookings', bookingData);
      console.log('Booking response:', response.data);
      
      // Reset the form
      setService('');
      setDate('');
      setTime('');
      setNotes('');

      // Provide feedback to the user
      alert('Booking successfully submitted!');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Book a Cleaning Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Service Type</label>
          <select
            className="form-select"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select a Service</option>
            <option value="regular_cleaning">Regular Cleaning</option>
            <option value="deep_cleaning">Deep Cleaning</option>
            <option value="move_out_cleaning">Move Out Cleaning</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Additional Notes</label>
          <textarea
            className="form-control"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Booking</button>
      </form>
    </div>
  );
}

export default Booking;
