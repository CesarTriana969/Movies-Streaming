const { DataTypes } = require("sequelize");

const db = require("../utils/database");
const Seasons = require("./seasons.models");

const Episodes = db.define("episodes", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  episodeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seasonId: {
    type: DataTypes.UUID,
    references: {
      model: Seasons,
      key: 'id'
    }
  },
  coverUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  episodeUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Episodes