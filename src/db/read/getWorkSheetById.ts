import { IWorkSheet } from "@/types";

export const getWorkSheetById = async (
  id: string
): Promise<IWorkSheet | null> => {
  const data = await fetch(
    process.env.NEXT_CLIENT_URL + "/api/worksheets?worksheetId=" + id
  );

  if (!data.ok) return null;

  const jsonData = await data.json();

  if (jsonData) {
    return jsonData.worksheets;
  } else {
    return null;
  }
};
