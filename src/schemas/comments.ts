import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  organization: String,
  comment: String,
  is_deleted: Boolean,
}, {
  timestamps: true
});

export default mongoose.model("Comments", commentsSchema);
