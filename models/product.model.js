const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  oldMRP: { type: Number, required: true },
  discount: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
});

const productModel = model("product", productSchema);

module.exports = productModel;
