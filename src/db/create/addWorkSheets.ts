import WorkSheetModel from "@/models/WorkSheetSchema";
import { IWorkSheet } from "@/types";

async function addWorkSheet(
  title: string,
  gradeId: string,
  sectionId: string,
  chapterId: string
): Promise<IWorkSheet> {
  try {
    const newWorkSheet = await WorkSheetModel.create({
      title,
      gradeId,
      sectionId,
      chapterId,
      state: "unpublished",
    });

    return newWorkSheet;
  } catch (error) {
    throw error;
  }
}

export { addWorkSheet };
