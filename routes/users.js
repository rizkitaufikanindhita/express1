const express = require("express");
const router = express.Router();
const response = require("../response");
const UsersModel = require("../models/users"); // representasi table di code kita
const bcrypt = require("bcrypt"); // untuk mengenkripsi password
const passwordCheck = require("../utils/passwordCheck");

router.get("/", async (req, res) => {
  const users = await UsersModel.findAll();

  response(200, users, "data from table user", res);
});

router.post("/login", async (req, res) => {
  const { nip, password } = req.body;

  // const userData = await UsersModel.findOne({
  //   where: {
  //     nip: nip,
  //   },
  // });

  // const comparedPassword = await bcrypt.compare(password, userData.password);

  // menggunakan utils/passwordCheck.js
  const comparedPassword = await passwordCheck(nip, password);

  if (comparedPassword) {
    response(200, { nip: nip }, "login success", res);
  } else {
    response(400, "error", "login failed", res);
  }
});

router.post("/", async (req, res) => {
  const { nip, nama, password } = req.body;

  // req password sudah masuk di bcrypt
  const encryptedPassword = await bcrypt.hash(password, 10);

  const users = await UsersModel.create({
    nip,
    nama,
    password: encryptedPassword,
  });

  response(200, users.nama, "user created", res);
});

router.put("/", async (req, res) => {
  const { nip, nama, password, passwordBaru } = req.body;

  // // cari user berdasarkan nip
  // // data disimpan diuserData
  // const userData = await UsersModel.findOne({
  //   where: {
  //     nip: nip,
  //   },
  // });
  // if (!userData) {
  //   response(400, "error", "user not found", res);
  // }

  // // userData diambil passwordnya (yang dienkripsi) untuk dibandingkan dengan password (polos) yang dikirim dari client
  // const comparedPassword = await bcrypt.compare(password, userData.password);

  // menggunakan utils/passwordCheck.js
  const comparedPassword = await passwordCheck(nip, password);

  // passwordBaru dienkripsi
  const encryptedPassword = await bcrypt.hash(passwordBaru, 10);

  // userData diambil passwordnya untuk dibandingkan dengan password yang dikirim dari client
  // userData sebatas untuk membandingkan password
  if (comparedPassword) {
    const users = await UsersModel.update(
      {
        nama,
        password: encryptedPassword,
      },
      {
        where: {
          nip: nip,
        },
      }
    );
    response(200, { updated: users[0] }, "user updated", res);
  } else {
    response(400, "error", "password salah", res);
  }
});

router.delete("/", async (req, res) => {
  const { nip, password } = req.body;

  const userData = await UsersModel.findOne({
    where: {
      nip: nip,
    },
  });

  if (!userData) {
    response(400, "error", "user not found", res);
  }

  if (userData.password === password) {
    const users = await UsersModel.destroy({
      where: {
        nip: nip,
      },
    });
    response(200, "success", "user deleted", res);
  } else {
    response(400, "error", "password salah", res);
  }
});

module.exports = router;
