const { default: mongoose } = require("mongoose");

const RequestCooperationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    explanation: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

export default mongoose.models.RequestCooperation ||
  mongoose.model("RequestCooperation", RequestCooperationSchema);
