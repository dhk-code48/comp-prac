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
import { getChapterName } from "@/lib/getChapterName";
import { FC } from "react";

const Chapter: FC<{
  chapterId: string;
  worksheets: IWorkSheet[];
}> = async ({ chapterId, worksheets }) => {
  // const chapterName: IChapter | any = await getChapterName(chapterId);
  // // console.log(chapters.or);
  // console.log("CHAPTERS => ", chapterName && chapterName);

  return (
    <>
      {/* <h1 className="font-bold text-xl">{chapterName && chapterName}</h1> */}
      {/* {Object.keys(worksheets).map((worksheetId) => {
        const worksheet = worksheets[worksheetId];
        return <WorkSheetsCard title={worksheet.title} />;
      })} */}
      <hr />
    </>
  );
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) return <h1>Access Desnied !!</h1>;

  const userInfo: IUser | null = await getUserInfo(session.user.id);

  if (!userInfo) return <h1>Loading</h1>;
  console.log(
    process.env.NEXT_CLIENT_URL +
      "/api/worksheets?section=[" +
      userInfo.assignedSections +
      "]"
  );

  const data = await fetch(
    process.env.NEXT_CLIENT_URL +
      "/api/worksheets?section=[" +
      userInfo.assignedSections.map((id) => '"' + id + '"') +
      "]"
  );
  const chapters: OrganizedWorksheetsByChapter =
    data.status === 200 ? await data.json() : null;

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
          {chapters &&
            Object.keys(chapters).map((chapterId) => {
              const worksheets = chapters[chapterId];
              return <Chapter chapterId={chapterId} worksheets={worksheets} />;
            })}
        </div>
      </div>
    </main>
  );
}
