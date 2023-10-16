// representasi table di code kita
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");

class Absensi extends Model {}

// Absensi.init akan menghasilkan tabel bernama Absensi
// yang memiliki kolom nip, nama, dan password
Absensi.init(
  {
    users_nip: {
      type: DataTypes.INTEGER,
      length: 8,
    },
    status: {
      type: DataTypes.ENUM("IN", "OUT"),
    },
  },
  {
    sequelize,
    modelName: "Absensi",
  }
);

module.exports = Absensi;
