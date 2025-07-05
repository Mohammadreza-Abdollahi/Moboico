const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  img: { type: String, default: "" },
  alt_Img: String,
  price: Number,
  discount: Number,
  count: Number,
  content: String,
  createAt: { type: String, required: true },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
