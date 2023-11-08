import AddChapterForm from "@/components/AddChapterForm";
import AddWorkSheetForm from "@/components/AddWorkSheets";
import WorksheetCard from "@/components/cards/WorksheetCard";
import { getSectionAndGrade } from "@/db/read/getSection";
import { IChapter, IWorkSheet } from "@/types";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface props {
  params: {
    sectionId: string;
  };
}

const ChapterWorksheet: FC<{
  chapterId: string;
}> = async ({ chapterId }) => {
  const WorkSheets = await fetch(
    "http://129.150.50.164:3000/api/worksheets?chapterId=" + chapterId
  ).then((res) => res.json());
  console.log("WorkSheets =>>>", WorkSheets.worksheets);

  return (
    <div className="flex flex-wrap justify-between gap-y-5 lg:mx-10 py-5">
      {WorkSheets.worksheets.map((worksheet: IWorkSheet) => {
        console.log("UM", worksheet);
        return <WorksheetCard userId={worksheet._id} worksheet={worksheet} />;
      })}
    </div>
  );
};

const TeacherSection: FC<props> = async ({ params }) => {
  const sectionInfo = await getSectionAndGrade(params.sectionId);
  const chapters: IChapter[] | null = await fetch(
    process.env.CLIENT_URL + "/api/chapters?sectionId=" + params.sectionId
  ).then((res) => res.json());

  if (!sectionInfo) {
    return <></>;
  }

  return (
    <div className="py-10 px-5">
      <div className="flex gap-5 ">
        <Link href={"/teacher"}>
          <MoveLeft />
        </Link>
        <h2 className="font-bold text-2xl mb-3">WorkSheets</h2>
      </div>
      <hr />
      <div className="mt-5 flex lg:gap-x-10 gapy-5 flex-col">
        {chapters &&
          chapters.map((chapter) => {
            return (
              <div>
                <div className="flex gap-10 items-center my-5">
                  <h1 className="text-lg font-bold text-gray-800">
                    {chapter.title}
                  </h1>
                  <AddWorkSheetForm
                    sectionId={params.sectionId}
                    gradeId={sectionInfo.grade._id}
                    chapter={chapter.title}
                    chapterId={chapter._id}
                  />
                </div>
                <ChapterWorksheet chapterId={chapter._id} />
              </div>
            );
          })}
      </div>
      <AddChapterForm
        grade={sectionInfo.grade.grade}
        gradeId={sectionInfo.grade._id}
        section={sectionInfo.section.section}
        sectionId={params.sectionId}
      />
    </div>
  );
};

export default TeacherSection;
