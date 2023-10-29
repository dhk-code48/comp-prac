import WorksheetCard from "@/components/cards/WorksheetCard";
import { getUserData } from "@/db/read/getUserData";
import { getWorkSheetById } from "@/db/read/getWorkSheetById";
import { IWorkSheet } from "@/types";
import React, { FC } from "react";

interface pageProps {
  params: {
    worksheetId: string;
  };
}

const TeacherSingleWorkSheet: FC<pageProps> = async ({ params }) => {
  const worksheet: IWorkSheet | null = await getWorkSheetById(
    params.worksheetId
  );
  const teacherInfo = await getUserData();

  if (!worksheet || !teacherInfo) return <h1>Not Found</h1>;
  console.log(worksheet);

  return (
    <div className="px-2">
      <WorksheetCard worksheet={worksheet} userId={teacherInfo._id} />
      <h1 className="font-bold pb-2 text-gray-800">Student States</h1>
      <hr className="mr-5" />
      <div></div>
    </div>
  );
};

export default TeacherSingleWorkSheet;
