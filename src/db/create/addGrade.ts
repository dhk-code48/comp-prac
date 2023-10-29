import GradeModel from "@/models/GradesSchema";
import { Document, Model, model, Schema } from "mongoose";

interface IGrade extends Document {
  sectionsId: string[];
  grade: string;
}

async function addGrade(
  sectionsId: string[] | null,
  grade: string
): Promise<IGrade | null> {
  try {
    const newGrade = GradeModel.create({ sectionsId, grade });

    return newGrade;
  } catch (error) {
    throw error;
  }
}

export { addGrade };
