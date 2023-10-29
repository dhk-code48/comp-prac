import { IStudentStates } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const StudentStateSchema = new Schema<IStudentStates>(
  {
    sectionId: String,
    studentId: String,
    gradeId: String,
    worksheetId: String,
    state: String,
  },
  { timestamps: true, id: true }
);

const StudentStatesModel: Model<IStudentStates> =
  mongoose.models.StudentStates ||
  mongoose.model("StudentStates", StudentStateSchema);
export default StudentStatesModel;
