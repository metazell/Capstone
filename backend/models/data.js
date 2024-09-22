const { Sequelize } = require('sequelize');

// Initialize Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize('geauxclean', 'evrentals', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Define your models here (User, Service, Booking, etc.)
const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'user',
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

const Service = sequelize.define('Service', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

const Booking = sequelize.define('Booking', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  serviceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  notes: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
  },
});

// Sync all models
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = { sequelize, User, Service, Booking };
