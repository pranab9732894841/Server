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
// 60cdc0745a4b3329346a56c8
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
// router.patch("/", async ()=>{

// })

// Deleting One Peoducts
// router.delete("/", async ()=>{

// })

//middleware
async function getProduct(req, res, next) {
  let products;
  try {
    products = await Products.findById(req.params.id);
   
    if (products == null) {
      return res.status(404).json({ message: "Cannnot find any products" });
    }
  } catch (error) {
    res.status(505).json({ message: error.message });
  }
 
  res.product = products;
  next();
}

module.exports = router;
