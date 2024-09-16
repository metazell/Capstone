const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {}

  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services', 
        key: 'id'
      }
    },
    service: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    notes: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
