const { DataTypes } = require("sequelize");

const db = require("../utils/database");

const Movies = db.define("movies", {
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
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  trailer_url: {
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
  },
  movie_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  clasification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0
  }
});

module.exports = Movies