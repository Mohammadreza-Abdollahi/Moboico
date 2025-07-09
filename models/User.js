const { default: mongoose } = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String },
    addressLine: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);
const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: [true, "وارد کردن نام کاربری الزامی است."],
    trim: true,
    minlength: [8, "نام کاربری باید حداقل 8 کاراکتر باشد"],
    maxlength: [20, "نام کاربری باید حداکثر 20 کاراکتر باشد."],
    match: [
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "نام کاربری باید شامل حروف و عدد باشد",
    ],
  },
  email: {
    type: String,
    required: [true, "وارد کردن ایمیل الزامی است."],
    unique: [true, "این ایمیل قبلا وارد شده است."],
    lowercase: true,
    match: [/.+\@.+\..+/, "فرمت ایمیل معتبر نیست!"],
  },
  password: {
    type: String,
    required: [true, "وارد کردن رمزعبور الزامی است."],
    minlength: [8, "رمزعبور باید حداقل 8 کاراکتر باشد"],
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-$#]).{8,}$/,
      "رمزعبور باید حداقل ۸ کاراکتر، شامل حروف، عدد و یکی از کاراکترهای - یا $ یا # باشد",
    ],
  },
  phone: {
    type: String,
  },
  addresses: [AddressSchema],
  role: {
    type: String,
    enum: ["user", "admin", "creator"],
    default: "user",
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      product: {
        type: String,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  favorites: [
    {
      type: String,
      ref: "Product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
