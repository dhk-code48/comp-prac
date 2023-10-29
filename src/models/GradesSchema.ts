import { IGrade } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const GradeSchema = new Schema<IGrade>(
  {
    sectionsId: [String],
    grade: String,
  },
  { timestamps: true, id: true }
);

const GradeModel: Model<IGrade> =
  mongoose.models.Grades || mongoose.model("Grades", GradeSchema);
export default GradeModel;
