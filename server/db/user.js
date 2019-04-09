const db = require("./db");
const Sequelize = require("sequelize");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
