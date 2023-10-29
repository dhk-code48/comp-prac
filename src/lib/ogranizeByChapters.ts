export interface Worksheet {
  _id: string;
  title: string;
  description: string;
  grade: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  chapterId: string;
  sections: { name: string; state: string }[];
  order: number;
}

export interface OrganizedWorksheetsByChapter {
  [chapter: string]: Worksheet[];
}

export const organizeByChapters = (
  worksheets: Worksheet[]
): OrganizedWorksheetsByChapter => {
  const organized: OrganizedWorksheetsByChapter = {};

  worksheets.forEach((worksheet) => {
    const chapter = worksheet.chapterId;

    if (!organized[chapter]) {
      organized[chapter] = [];
    }

    organized[chapter].push(worksheet);
  });

  return organized;
};
