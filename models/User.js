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
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    addresses: [AddressSchema],
    role: {
      type: String,
      enum: ["user", "admin", "creator"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
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
  },
  { _id: false }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
