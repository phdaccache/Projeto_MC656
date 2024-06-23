const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const findPassword = await User.findPassword(req.body);

    if (findPassword.length == 0) {
      return res.status(400).json({ ok: "User doesnt exist" });
    }

    const dbPassword = findPassword[0].password;
    const passwordMatch = await bcrypt.compare(password, dbPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userEmail: email }, "your-secret-key", {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  },
};
