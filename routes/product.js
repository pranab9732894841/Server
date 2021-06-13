const express = require("express");
const router = express.Router();
const Products = require("../models/product");

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
// router.get("/", async ()=>{

// })

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
// router.patch("/", async ()=>{

// })

// Deleting One Peoducts
// router.delete("/", async ()=>{

// })

module.exports = router;
