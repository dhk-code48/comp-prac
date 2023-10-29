import { IWorkSheet } from "@/types";

export interface OrganizedWorksheets {
  [sectionId: string]: {
    [chapter: string]: IWorkSheet[];
  };
}

export const organizeByGradesAndChapters = (
  worksheets: IWorkSheet[]
): OrganizedWorksheets => {
  const organized: OrganizedWorksheets = {};

  worksheets.forEach((worksheet) => {
    const sectionId = worksheet.sectionId;
    const chapter = worksheet.chapterId;

    if (!organized[sectionId]) {
      organized[sectionId] = {};
    }

    if (!organized[sectionId][chapter]) {
      organized[sectionId][chapter] = [];
    }

    organized[sectionId][chapter].push(worksheet);
  });

  return organized;
};
