import { ISections } from "@/types";
import mongoose, { Model, model, Schema } from "mongoose";

const SectionsSchema = new Schema<ISections>(
  {
    section: String,
    gradeId: String,
  },
  { timestamps: true, id: true }
);

const SectionsModel: Model<ISections> =
  mongoose.models.Sections || model("Sections", SectionsSchema);

export default SectionsModel;
