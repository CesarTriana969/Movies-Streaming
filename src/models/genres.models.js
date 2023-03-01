const { DataTypes } = require("sequelize");

const db = require("../utils/database");

const Genres = db.define("genres", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Genres