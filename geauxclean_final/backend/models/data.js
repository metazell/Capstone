const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this path is correct

// User Model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'users',
  timestamps: false
});

// Service Model
const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'services',
  timestamps: false
});

// Booking Model
const Booking = sequelize.define('Booking', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
}, {
  tableName: 'bookings',
  timestamps: false
});

// Define Relationships
User.hasMany(Booking, { foreignKey: 'userId' });
Service.hasMany(Booking, { foreignKey: 'serviceId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Service, { foreignKey: 'serviceId' });

// Export models
module.exports = { User, Service, Booking };
