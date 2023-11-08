"use client";
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

const AddChapterForm: FC<{
  sectionId: string;
  gradeId: string;
  grade: string;
  section: string;
}> = ({ grade, gradeId, section, sectionId }) => {
  const [title, setTitle] = useState("");

  async function handleChapterAddition() {
    await fetch("http://129.150.50.164:3000" + "/api/chapters", {
      method: "POST",
      body: JSON.stringify({
        gradeId,
        sectionId,
        title,
      }),
    })
      .finally(() => window.location.reload)
      .catch((e) => console.log(e));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          Add Chapter <Plus size={17} className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Chapter</DialogTitle>
          <DialogDescription>
            You are adding a new chapter to {grade}"{section}"
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Chapter Name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleChapterAddition} type="submit">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddChapterForm;
