import GradeModel from "@/models/GradesSchema";

async function deleteGrade(gradeId: string): Promise<void> {
  try {
    await GradeModel.findByIdAndRemove(gradeId);
  } catch (error) {
    throw error;
  }
}
export { deleteGrade };
