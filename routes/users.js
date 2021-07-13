const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const getProduct = require("../middleware/getProduct");

//singin
router.post("/singin", async (req, res) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.pasword
    );

    const token = await user.generateAuthToken();
    res.status(202).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//singup
router.post("/singup", async (req, res) => {
  const user = new Users(req.body);
  try {
    const token = await user.generateAuthToken();
    res.status(202).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//getprofile

//updateprofile

//Export
module.exports = router;
