// representasi table di code kita
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");

class User extends Model {}

// User.init akan menghasilkan tabel bernama Users
// yang memiliki kolom nip, nama, dan password
User.init(
  {
    nip: {
      type: DataTypes.INTEGER,
      unique: true,
      length: 8,
    },
    nama: {
      type: DataTypes.STRING,
      length: 50,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Users",
  }
);

module.exports = User;
