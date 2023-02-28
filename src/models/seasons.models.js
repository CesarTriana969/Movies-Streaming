const { DataTypes } = require("sequelize");

const db = require("../utils/database");
const Series = require("./series.models");

const Seasons = db.define("seasons", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  seriesId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Series,
      key: 'id'
    }
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
  season_numbers: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cover_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  trailer_url: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  }
});

module.exports = Seasons