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
import addGrade from "@/functions/addGrade";
import { Shell } from "lucide-react";
import { FC, useState } from "react";

const GradeAddFrom: FC<{ userId: string }> = ({ userId }) => {
  const [grade, setGrade] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  async function handleGradeAddition() {
    setIsLoading(true);
    const newGrade = await addGrade(grade, userId);
    if (!newGrade) {
      setError(true);
    } else {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Grade</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adding Grade</DialogTitle>
          <DialogDescription>You can add grade from here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center space-y-2">
            <Label htmlFor="name" className="text-right">
              Grade Label
            </Label>
            <Input
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              id="name"
              placeholder="Class Number"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="items-center flex-col">
          <Button
            type="submit"
            onClick={handleGradeAddition}
            disabled={isLoading}
          >
            {isLoading && <Shell className="mr-2 h-4 w-4 animate-spin" />}
            Add Grade
          </Button>

          {error && (
            <div className="bg-red-500 px-5 py-1 font-semibold rounded-lg text-white text-center">
              Cann't Add Such Grade
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default GradeAddFrom;
