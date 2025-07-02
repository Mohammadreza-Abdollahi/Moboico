const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    img: String,
    alt_Img: String,
    price: Number,
    discount: Number,
    count: Number
});

export default mongoose.models.Product || mongoose.model("Product" , ProductSchema);