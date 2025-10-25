const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "وارد کردن نام محصول الزامی است."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "وارد کردن توضیحات محصول الزامی است."],
    },
    price: {
      type: Number,   
      required: [true, "وارد کردن قیمت محصول الزامی است."],
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "وارد کردن دسته بندی محصول الزامی است."],
    },
    brand: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    img: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
