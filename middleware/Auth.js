const jwt = require("jsonwebtoken");

const Users = require("../models/Users");

async function auth(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = await jwt.verify(token, "hgfhgdffjhsgjhsghjsgjhksgjhksgjhsgdjhsagdjkhgskgskjgskjghkjsdhgkshg");
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
