import { IChapter } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const ChaptersSchema = new Schema<IChapter>(
  {
    sectionId: String,
    title: String,
    gradeId: String,
  },
  { timestamps: true, id: true }
);

const ChaptersModel: Model<IChapter> =
  mongoose.models.Chapters || mongoose.model("Chapters", ChaptersSchema);
export default ChaptersModel;
