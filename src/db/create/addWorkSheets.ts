import WorkSheetModel from "@/models/WorkSheetSchema";
import { IWorkSheet } from "@/types";

async function addWorkSheet(
  title: string,
  description: string,
  gradeId: string,
  sectionId: string
): Promise<IWorkSheet> {
  try {
    const newWorkSheet = WorkSheetModel.create({
      title,
      description,
      gradeId,
      sectionId,
      state: "incompleted",
    });

    return newWorkSheet;
  } catch (error) {
    throw error;
  }
}

export { addWorkSheet };
