const { default: mongoose } = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    id: Number,
    title: String,
    img: String,
    alt_Img: String,
    date: String
});

export default mongoose.models.Article || mongoose.model("Article" , ArticleSchema);