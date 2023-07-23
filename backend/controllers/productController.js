const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncError = require("../middleware/asyncError");
const ApiFeatures = require("../utils/apiFfeatures");
//create --admin
exports.createProduct = asyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//get all products
exports.getAllProducts = asyncError(async (req, res, next) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query).search();
  const products = await apiFeature.query;
  res.status(200).json({ success: true, products });
});

//update product admin

exports.updateProduct = asyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});
//delete prduct

exports.deleteProduct = asyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "product deleted success",
  });
});

//get single product details
exports.getSingleProduct = asyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product s found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
