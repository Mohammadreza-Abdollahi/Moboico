const { default: mongoose } = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  img: { type: String, default: "" },
  alt_Img: String,
  createAt: { type: Date, default: Date.now, required: true },
});

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);
