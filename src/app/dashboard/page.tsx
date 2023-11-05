import DashboardDropDown from "@/components/DashboardDropDown";
import WorkSheetsCard from "@/components/WorkSheetsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserInfo from "@/db/functions/gerUserInfo";
import { IChapter, IUser, IWorkSheet } from "@/types";
import {
  OrganizedWorksheetsByChapter,
  Worksheet,
} from "@/lib/ogranizeByChapters";
import { getChapterDetails } from "@/lib/getChapterName";
import { FC } from "react";
import { getWorkSheets } from "@/db/read/getWorkSheets";
import { OrganizedWorksheets } from "@/lib/organizeByGrades";

const ChapterWorksheet: FC<{
  chapterId: string;
  chapterWorksheets: IWorkSheet[];
}> = async ({ chapterId, chapterWorksheets }) => {
  const chapterDetails: IChapter | null = await getChapterDetails(chapterId);
  console.log("chapterDetails", chapterDetails);

  return (
    <>
      <h1 className="font-bold text-xl">
        {chapterDetails && chapterDetails.title}
      </h1>
      <div className="flex flex-wrap justify-between gap-y-5 mx-10 py-5">
        {chapterWorksheets.map((worksheet) => {
          return <WorkSheetsCard title={worksheet.title} />;
        })}
      </div>
      <hr />
    </>
  );
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) return <h1>Access Desnied !!</h1>;

  const userInfo: IUser | null = await getUserInfo(session.user.id);

  if (!userInfo) return <h1>Loading</h1>;

  const sectionWorksheets: OrganizedWorksheets | null = await getWorkSheets(
    userInfo.assignedSections
  );

  return (
    <main>
      <div className="w-screen flex items-center h-20 bg-card flex-warp px-5 justify-between">
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
          Overview
        </h2>
        <div className="mt-5 space-y-3">
          {sectionWorksheets &&
            Object.keys(sectionWorksheets).map((sectionId) => {
              return (
                <>
                  {Object.keys(sectionWorksheets[sectionId]).map(
                    (chapterId) => {
                      const chapterWorksheets =
                        sectionWorksheets[sectionId][chapterId];
                      console.log("CHAPTER ID", chapterId);
                      return (
                        <ChapterWorksheet
                          chapterId={chapterId}
                          chapterWorksheets={chapterWorksheets}
                        />
                      );
                    }
                  )}
                </>
              );
            })}
        </div>
      </div>
    </main>
  );
}
