import {
  OrganizedWorksheets,
  organizeByGradesAndChapters,
} from "@/lib/organizeByGrades";
import { IWorkSheet } from "@/types";

export const getWorkSheets = async (
  id: string[]
): Promise<OrganizedWorksheets | null> => {
  const data = await fetch(
    process.env.NEXT_CLIENT_URL +
      "/api/worksheets?sectionsId=[" +
      id.map((sId) => '"' + sId + '"').join(",") +
      "]"
  );

  if (!data.ok) return null;

  const jsonData = await data.json();

  if (jsonData) {
    return organizeByGradesAndChapters(jsonData.worksheets);
  } else {
    return null;
  }
};
