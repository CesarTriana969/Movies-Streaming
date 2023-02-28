const { DataTypes } = require("sequelize");

const db = require("../utils/database");

const Users = db.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'firstName: required file'
      },
      len: [1, 255]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'lastName: required file'
      },
      len: [1, 255]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'email: required file'
      },
      len: [1, 255],
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'password: required file'
      },
      len: [1, 255]
    }
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false
  },
  profile_img: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  }
});

module.exports = Users