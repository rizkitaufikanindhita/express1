const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
// cors (^2.8.5): Ini adalah dependensi untuk mengaktifkan Cross-Origin Resource Sharing (CORS) dalam aplikasi Node.js Anda, yang memungkinkan permintaan dari domain berbeda.

const userEndpoint = require("./routes/users");
const absensiEndpoint = require("./routes/absensi");

// sequelize (^6.33.0): Sequelize adalah ORM (Object-Relational Mapping) untuk Node.js yang memudahkan interaksi dengan database relasional, seperti MySQL, melalui model objek JavaScript.
const sequelize = require("./db.config");
sequelize.sync().then(() => {
  console.log("Database Ready!");
});
//mengatur ulang skema database berdasarkan definisi model yang telah Anda tentukan. Ini akan menciptakan tabel-tabel sesuai dengan model Anda dalam database yang telah diatur dalam konfigurasi.

app.use(cors());

app.use(express.json()); // menggantikan body-parser

app.use("/users", userEndpoint);

app.use("/absensi", absensiEndpoint);

app.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`);
});
