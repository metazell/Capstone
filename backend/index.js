const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Service, Booking } = require('./models/data'); // Updated path to models
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON requests

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ---------------------------------------------
// JWT Authentication Middleware
// ---------------------------------------------
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

// ---------------------------------------------
// Users CRUD Routes
// ---------------------------------------------

// Register user
app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ username, email, password: hashedPassword, role });

    // Respond with the newly created user (excluding password)
    res.status(201).json({ message: 'User created successfully', user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
});

// Get a single user by ID
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// ---------------------------------------------
// Services CRUD Routes
// ---------------------------------------------

// Get all services
app.get('/api/services', async (req, res) => {
  const services = await Service.findAll();
  res.json(services);
});

// Create a new service
app.post('/api/services', async (req, res) => {
  const { name, description, price } = req.body;
  const service = await Service.create({ name, description, price });
  res.status(201).json(service);
});

// Update a service
app.put('/api/services/:id', async (req, res) => {
  const { name, description, price } = req.body;
  const service = await Service.findByPk(req.params.id);
  if (!service) return res.status(404).json({ error: 'Service not found' });

  await service.update({ name, description, price });
  res.json(service);
});

// Delete a service
app.delete('/api/services/:id', async (req, res) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) return res.status(404).json({ error: 'Service not found' });

  await service.destroy();
  res.status(204).send();
});

// ---------------------------------------------
// Bookings CRUD Routes
// ---------------------------------------------

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  const bookings = await Booking.findAll();
  res.json(bookings);
});

// Create a new booking
app.post('/api/bookings', async (req, res) => {
  const { userId, serviceId, date, status } = req.body;
  const booking = await Booking.create({ userId, serviceId, date, status });
  res.status(201).json(booking);
});

// Update a booking
app.put('/api/bookings/:id', async (req, res) => {
  const { userId, serviceId, date, status } = req.body;
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  await booking.update({ userId, serviceId, date, status });
  res.json(booking);
});

// Delete a booking
app.delete('/api/bookings/:id', async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  await booking.destroy();
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
