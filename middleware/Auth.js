const jwt = require("jsonwebtoken");
const Users = require("../models/users");

async function auth(req, res, next) {
  try {
    const token = req.header("meico").replace("Bearer ", "");
    const decode = await jwt.verify(token, `${process.env.SERECT_KEY}`);
    const user = await Users.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send({ error: "authentication X" });
  }
}

module.exports = auth;
