import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: [true, "موضوع تیکت الزامی است."],
    trim: true,
    maxlength: [50, "موضوع نباید بیشتر از 50 کاراکتر باشد."],
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ["user", "admin", "creator"],
        required: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
      },
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    enum: ["new", "open", "pending", "resolved", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
