const bcrypt = require("bcrypt");
const UsersModel = require("../models/users");

const passwordCheck = async (nip, password) => {
  const userData = await UsersModel.findOne({
    where: {
      nip: nip,
    },
  });
  if (!userData) {
    response(400, "error", "user not found", res);
  }

  // userData diambil passwordnya (yang dienkripsi) untuk dibandingkan dengan password (polos) yang dikirim dari client
  const comparedPassword = await bcrypt.compare(password, userData.password);

  return { comparedPassword, userData };
};

module.exports = passwordCheck;
