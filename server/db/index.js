const db = require("./db");
const Sequelize = require("sequelize");
const User = require("./user")

//define relationships between models

module.exports = {
  db,
  User
  //any other models
};
