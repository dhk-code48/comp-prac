import mongoose from "mongoose";

const WorkSheetSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    grade: String,
  },
  { timestamps: true, id: true }
);

export default mongoose.models.WorkSheet ||
  mongoose.model("WorkSheet", WorkSheetSchema);
