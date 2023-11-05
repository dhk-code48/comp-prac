import { getWorkSheetById } from "@/db/read/getWorkSheetById";
import { getWorkSheets } from "@/db/read/getWorkSheets";
import React from "react";

interface props {}
const TeacherSection = () => {
  const worksheets = await getWorkSheets(id);

  return <div></div>;
};

export default TeacherSection;
