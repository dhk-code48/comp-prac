import DashboardDropDown from "@/components/DashboardDropDown";
import WorkSheetsCard from "@/components/WorkSheetsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserInfo from "@/db/functions/gerUserInfo";
import { IChapter, IStudentStates, IUser, IWorkSheet } from "@/types";

import { getChapterDetails } from "@/lib/getChapterName";
import { FC } from "react";
import { getWorkSheets, OrganizedWorksheets } from "@/db/read/getWorkSheets";
import { getWorkSheetById } from "@/db/read/getWorkSheetById";

const WorkSheet: FC<{ worksheet: IWorkSheet; userId: string }> = async ({
  worksheet,
  userId,
}) => {
  const studentstate = await fetch(
    "http://129.150.50.164:3000/api/studentstates?userId=" +
      userId +
      "&worksheetId=" +
      worksheet._id
  ).then((res) => res && res.json());

  if (!studentstate) {
    return <></>;
  }

  return (
    <WorkSheetsCard
      title={worksheet.title}
      state={studentstate.state}
      disable={studentstate.state === "incomplete"}
    />
  );
};

const ChapterWorksheet: FC<{
  chapterId: string;
  userId: string;
  chapterWorksheets: IWorkSheet[];
}> = async ({ chapterId, chapterWorksheets, userId }) => {
  const chapterDetails: IChapter | null = await getChapterDetails(chapterId);

  return (
    <>
      <h1 className="font-bold text-xl">
        {chapterDetails && chapterDetails.title}
      </h1>
      <div className="space-y-5 mx-10 py-5 flex flex-col items-start">
        {chapterWorksheets.map((worksheet) => {
          if (worksheet.state === "published") {
            return <WorkSheet worksheet={worksheet} userId={userId} />;
          }
        })}
      </div>
      <hr />
    </>
  );
};

interface prop {
  worksheets: IStudentStates[];
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) return <h1>Access Desnied !!</h1>;

  const userInfo: IUser | null = await getUserInfo(session.user.id);

  if (!userInfo) return <h1>Loading</h1>;

  const sectionWorksheets: OrganizedWorksheets | null = await getWorkSheets(
    userInfo.assignedSections
  );

  const studentWorkSheetStates: prop = await fetch(
    "http://129.150.50.164:3000/api/studentstates?userId=" + session.user.id
  ).then((res) => res && res.json());

  if (!studentWorkSheetStates) return <></>;
  // const completed = studentWorkSheetStates.worksheets.filter(
  //   ({ state }) => state === "complete"
  // );
  const lastInCompletedState: IStudentStates =
    studentWorkSheetStates.worksheets.filter(
      ({ state }) => state === "incomplete"
    )[0];
  const lastInCompletedWorkSheet: IWorkSheet | null = await fetch(
    "http://129.150.50.164:3000/api/worksheets?worksheetId=" +
      lastInCompletedState.worksheetId
  ).then((res) => res && res.json());
  if (!lastInCompletedWorkSheet) return <></>;
  console.log("lastInCompletedWorkSheet", lastInCompletedWorkSheet);

  return (
    <main>
      <div className="flex items-center h-20 bg-card flex-warp px-5 justify-between">
        <div className="flex gap-4">
          <Input placeholder="Search All Worksheets ...." />
          <Button variant="outline">
            <Search size={20} />
          </Button>
        </div>
        <DashboardDropDown />
      </div>
      <div className="p-5">
        <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
          Complete Below WorkSheet
        </h2>

        <div className="my-10 flex flex-col px-10 items-start">
          <WorkSheetsCard
            sectionId={lastInCompletedState.sectionId}
            title={lastInCompletedWorkSheet.title}
            state={lastInCompletedState.state}
          />
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
          Chapters
        </h2>

        <div className="mt-5 space-y-3">
          {sectionWorksheets &&
            Object.keys(sectionWorksheets).map((chapterId) => {
              const chapterWorksheets: IWorkSheet[] =
                sectionWorksheets[chapterId];
              return (
                <>
                  <ChapterWorksheet
                    userId={session.user.id}
                    chapterId={chapterId}
                    chapterWorksheets={chapterWorksheets}
                  />
                </>
              );
            })}
        </div>
      </div>
    </main>
  );
}
