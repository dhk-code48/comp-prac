import { IWStates } from "@/types";
import mongoose, { Model, Schema, model } from "mongoose";

const WStatesSchema = new Schema<IWStates>(
  {
    worksheetId: String,
    gradeId: String,
    sectionId: String,
    state: String,
  },
  { timestamps: true, id: true }
);

const WStates: Model<IWStates> =
  mongoose.models.WorkSheet || model("WStates", WStatesSchema);

export default WStates;
