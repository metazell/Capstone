import React, { useState, useEffect } from 'react';
import './Booking.css';
import axios from 'axios';

const Booking = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    // Fetch available services
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/services');
        setServices(response.data.services);
        console.log('Fetched services:', response.data.services);  // Debugging console log
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { serviceId, date, time, notes } = formData;
    console.log('Sending booking data:', { serviceId, date, time, notes });  // Debugging console log

    try {
      const response = await axios.post('http://localhost:3001/api/bookings', { serviceId, date, time, notes }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Booking successful:', response.data);
      alert('Booking successful!');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="booking-container centered">
      <h1>Book a Cleaning Service</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Services</label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a Service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            min={new Date().toISOString().split('T')[0]}  // Restrict past dates
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any additional notes?"
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
