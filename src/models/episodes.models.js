const { DataTypes } = require("sequelize");

const db = require("../utils/database");
const Seasons = require("./seasons.models");

const Episodes = db.define("episodes", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'title: required file'
      },
      len: [1, 255]
    }
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  seasonId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Seasons,
      key: 'id'
    }
  },
  episode_number: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  episode_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  cover_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  }
});

module.exports = Episodes