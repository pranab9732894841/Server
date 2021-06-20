const Products = require("../models/product");

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

module.exports = getProduct;
