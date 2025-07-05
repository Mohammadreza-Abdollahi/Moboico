const { default: mongoose } = require("mongoose");

const SlideSchema = new mongoose.Schema({
    id: { type: String, required: true },
    image: { type: String, required: true },
    alt: String,
    head: String,
    head2: String,
    text: String,
    text2: String
});

export default mongoose.models.Slide || mongoose.model("Slide" , SlideSchema);