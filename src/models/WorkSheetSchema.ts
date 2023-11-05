import { IWorkSheet } from "@/types";
import mongoose, { Model, Schema, model } from "mongoose";

const WorkSheetSchema = new Schema<IWorkSheet>(
  {
    title: String,
    description: String,
    gradeId: String,
    sectionId: String,
    state: String,
  },
  { timestamps: true, id: true }
);

const WorkSheetModel: Model<IWorkSheet> =
  mongoose.models.WorkSheet || model("WorkSheet", WorkSheetSchema);

export default WorkSheetModel;
