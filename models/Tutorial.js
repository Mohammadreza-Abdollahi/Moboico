const { default: mongoose } = require("mongoose");

const TutorialSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  img: { type: String, default: "" },
  altImg: String,
  content: { type: String, required: true },
  teacher: { type: String, required: true },
  duration: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

export default mongoose.models.Tutorial ||
  mongoose.model("Tutorial", TutorialSchema);
