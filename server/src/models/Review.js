const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min: 1,
            max: 5
        }
    },

  });
};