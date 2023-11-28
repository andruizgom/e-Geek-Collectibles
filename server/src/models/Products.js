const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("Products", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
