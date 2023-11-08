import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { FC, useState } from "react";
import WorkSheetForm from "./WorkSheetForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const AddWorkSheetForm: FC<{
  chapterId: String;
  chapter: String;
  sectionId: String;
  gradeId: String;
}> = async ({ chapterId, chapter, sectionId, gradeId }) => {
  const userInfo = await getServerSession(authOptions);
  if (!userInfo) {
    return <></>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          Add WorkSheets <Plus size={17} className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add WorkSheets</DialogTitle>
          <DialogDescription>
            You are adding a new worksheet to {chapter}
          </DialogDescription>
        </DialogHeader>
        <WorkSheetForm
          userId={userInfo.user.id}
          sectionId={sectionId}
          chapterId={chapterId}
          gradeId={gradeId}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AddWorkSheetForm;
