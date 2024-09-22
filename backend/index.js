const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Service, Booking } = require('./models/data'); // Ensure models are correctly referenced
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Register user
app.post('/api/register', async (req, res) => {
  const { username, email, password, role, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists. Please log in or use a different email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword, 
      role, 
      phoneNumber 
    });

    res.status(201).json({ 
      message: 'User created successfully', 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        role: user.role, 
        phoneNumber: user.phoneNumber 
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Booking Routes
app.post('/api/bookings', authenticateToken, async (req, res) => {
  console.log('Received booking request:', req.body); // Log the booking request
  const { serviceId, date, time, notes } = req.body;
  const userId = req.user.id;

  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(400).json({ error: 'Invalid service selected. Please select a valid service.' });
    }

    const booking = await Booking.create({
      userId,
      serviceId,
      date,
      time,
      notes,
      status: 'pending'
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user bookings
app.get('/api/bookings', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const bookings = await Booking.findAll({ where: { userId }, include: [Service] }); // Include Service model in response
    res.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get available services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
