import AddChapterForm from "@/components/AddChapterForm";
import AddWorkSheetForm from "@/components/AddWorkSheets";
import WorkSheetsCard from "@/components/WorkSheetsCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { getSectionAndGrade } from "@/db/read/getSection";
import { getWorkSheetById } from "@/db/read/getWorkSheetById";
import { getWorkSheets } from "@/db/read/getWorkSheets";
import { getChapterDetails } from "@/lib/getChapterName";
import { OrganizedWorksheets } from "@/lib/organizeByGrades";
import { IChapter, IWorkSheet } from "@/types";
import { MoveLeft, Plus } from "lucide-react";
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
  // const WorkSheets = await fetch(
  //   "http://129.150.50.164:3000/api/worksheets?chapterId" + chapterId
  // ).then((res) => res.json());
  // console.log("WorkSheets =>>>", WorkSheets);

  return (
    <div className="flex flex-wrap justify-between gap-y-5 mx-10 py-5">
      {/* {WorkSheets.map((worksheet) => {
        return <WorkSheetsCard title={worksheet.title} />;
      })} */}
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

  const sectionWorksheets: OrganizedWorksheets | null = await getWorkSheets([
    params.sectionId,
  ]);

  // console.log("========>>>>>", sectionWorksheets);

  return (
    <div className="py-10 px-5">
      <div className="flex gap-5 ">
        <Link href={"/teacher"}>
          <MoveLeft />
        </Link>
        <h2 className="font-bold text-2xl mb-3">WorkSheets</h2>
      </div>
      <hr />
      <div className="mt-5 flex gap-x-10 gapy-5">
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
      {/* {sectionWorksheets &&
        Object.keys(sectionWorksheets).map((sectionId) => {
          console.log("sectionId", sectionId);
          return (
            <>
              {Object.keys(sectionWorksheets[sectionId]).map((chapterId) => {
                console.log("CHAPTER ID", chapterId);
                return <ChapterWorksheet chapterId={chapterId} />;
              })}
            </>
          );
        })} */}
      <AddChapterForm
        grade={sectionInfo.grade.grade}
        gradeId={sectionInfo.grade._id}
        section={sectionInfo.section.section}
        sectionId={params.sectionId}
      />
      {/* <Link
          href={"/teacher/" + params.sectionId + "/add"}
          className={buttonVariants()}
        >
          Add Chapter <Plus size={16} className="ml-2" />
        </Link> */}
    </div>
  );
};

export default TeacherSection;
