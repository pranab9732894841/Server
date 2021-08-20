const express = require("express");
const router = express.Router();
const Products = require("../models/product");
const getProduct = require("../middleware/getProduct");
const auth = require("../middleware/Auth")
// Get All Peoducts
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(505).json({ message: error.message });
  }
});

// Getting One Peoducts
router.get("/:id", getProduct, async (req, res) => {
  res.json(res.product);
});

// Creating one Peoducts
router.post("/", async (req, res) => {
  const product = new Products({
    name: req.body.name,
    price: req.body.price,
    qnt: req.body.qnt,
    ImagePath: req.body.ImagePath,
  });
  try {
    const newProduct = await product.save();

    res.status(202).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Updating One Peoducts
router.patch("/:id",  getProduct, async (req, res) => {
  console.log(req.body);
  if (req.body.name !== null) {
    res.product.name = req.user.name;
  }
  
  if (req.body.price !== null) {
    res.product.price = req.body.price;
  }
  if (req.body.qnt !== null) {
    res.product.qnt = req.body.qnt;
  }

  try {
    const update = res.product.save();
    res.status(201).json({ message: "Update product successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Deleting One Peoducts
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.status(200).json({ message: "Deleted product successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Export
module.exports = router;
