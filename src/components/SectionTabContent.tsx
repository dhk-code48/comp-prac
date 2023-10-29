"use client";
import { IWorkSheet } from "@/types";
import { FC } from "react";
import { TabsContent } from "./ui/tabs";
import moment from "moment";
import { Button, buttonVariants } from "./ui/button";
import updateWorksheet, { IUpatedWorksheet } from "@/db/update/updateWorksheet";
import { useRouter } from "next/navigation";
import WorksheetCard from "./cards/WorksheetCard";
import Link from "next/link";

const SectionTabContent: FC<{
  id: string;
  userId: string;
  sections: { [chapter: string]: IWorkSheet[] };
}> = ({ sections, id, userId }) => {
  const handleWorkSheetAddition = () => {};

  return (
    <>
      {Object.keys(sections).map((chapterId, index) => {
        const worksheets: IWorkSheet[] = sections[chapterId];
        return (
          <TabsContent key={index + 1} value={id}>
            <div className="flex justify-end">
              <Link
                href={"/teacher/worksheet/add"}
                className={buttonVariants()}
              >
                Add Worksheet
              </Link>
            </div>
            {worksheets.map((worksheet: IWorkSheet) => {
              return <WorksheetCard worksheet={worksheet} userId={userId} />;
            })}
          </TabsContent>
        );
      })}
    </>
  );
};

export default SectionTabContent;
