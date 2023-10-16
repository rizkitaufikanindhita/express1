const express = require("express");
const router = express.Router();
const response = require("../response");
const AbsensiModel = require("../models/absensi"); // representasi table di code kita
// untuk mengenkripsi password

router.get("/", async (req, res) => {
  const absensi = await AbsensiModel.findAll();

  response(200, absensi, "data from table absensi", res);
});

router.post("/checkin", async (req, res) => {
  const { nip } = req.body;

  const absensi = await AbsensiModel.create({
    users_nip: nip,
    status: "IN",
  });

  response(200, absensi, "checkin berhasil", res);
});

router.post("/checkout", async (req, res) => {
  const { nip } = req.body;

  const absensi = await AbsensiModel.create({
    users_nip: nip,
    status: "OUT",
  });

  response(200, absensi, "checkout berhasil", res);
});

module.exports = router;
