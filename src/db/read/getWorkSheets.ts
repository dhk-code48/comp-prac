import { IWorkSheet } from "@/types";

export interface OrganizedWorksheets {
  [chapter: string]: IWorkSheet[];
}

export const getWorkSheets = async (
  id: string[]
): Promise<OrganizedWorksheets | null> => {
  const data = await fetch(
    process.env.CLIENT_URL +
      "/api/worksheets?sectionsId=[" +
      id.map((sId) => '"' + sId + '"').join(",") +
      "]"
  );

  if (!data.ok) return null;

  const jsonData = await data.json();
  console.log("=>", jsonData.worksheets);

  if (jsonData) {
    const separatedData = jsonData.worksheets.reduce((acc, item) => {
      const chapterId = item.chapterId;
      if (!acc[chapterId]) {
        acc[chapterId] = [];
      }
      acc[chapterId].push(item);
      return acc;
    }, {});

    return separatedData;
  } else {
    return null;
  }
};
