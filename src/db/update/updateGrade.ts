import GradeModel from "@/models/GradesSchema";
import { IGrade } from "@/types";

async function updateGrade(
  gradeId: string,
  updatedData: Partial<IGrade>
): Promise<IGrade | null> {
  try {
    const updatedGrade = await GradeModel.findByIdAndUpdate(
      gradeId,
      updatedData,
      { new: true }
    );
    return updatedGrade;
  } catch (error) {
    throw error;
  }
}

export { updateGrade };
