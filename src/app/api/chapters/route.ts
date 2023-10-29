import connectMongoDb from "@/lib/mongodb";
import ChaptersModel from "@/models/ChaptersSchema";
import { IChapter } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const chapterId = request.nextUrl.searchParams.get("chapterId");
  console.log(chapterId);
  if (chapterId) {
    try {
      await connectMongoDb();
      const chapter: IChapter | null = await ChaptersModel.findById(
        chapterId
      ).lean();

      console.log("chapter", chapter);

      const output = chapter ? chapter : [];

      // Ensure that the result is converted to plain JavaScript objects.

      return NextResponse.json({ message: "OK" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}