// sequelize (^6.33.0): Sequelize adalah ORM (Object-Relational Mapping) untuk Node.js yang memudahkan interaksi dengan database relasional, seperti MySQL, melalui model objek JavaScript.

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("absensi", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

// menggunakan kurawal karena ambil modul sequelize saja
// kalau tidak pakai kurawal codenya jadi :
// const sequelize = require("sequelize");
// const Sequelize = sequelize.Sequelize;
// susah dibaca, jadi pakai kurawal saja

// sama" buat connection ke database
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "absensi",
// });

// module.exports = db;
