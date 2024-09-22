const jwt = require('jsonwebtoken');
const { User, Booking } = require('./models'); // Ensure proper models are imported

// Middleware to validate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from the "Bearer" header

  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid' });
    req.user = user; // Store user info in request
    next();
  });
}

// Booking route (protected)
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { service, date, time, notes } = req.body;
    const userId = req.user.id; // Get user ID from the token payload

    // Create the booking
    const booking = await Booking.create({
      userId,
      service,
      date,
      time,
      notes,
      status: 'pending', // Default status
    });

    // Respond with the created booking
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
