import connectMongoDb from "@/lib/mongodb";
import ChaptersModel from "@/models/ChaptersSchema";
import { IChapter } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    await connectMongoDb();
    const newChapter = await ChaptersModel.create({
      gradeId: body.gradeId,
      sectionId: body.sectionId,
      title: body.title,
    });
    return NextResponse.json({ ...newChapter }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const chapterId = request.nextUrl.searchParams.get("chapterId");
  const sectionId = request.nextUrl.searchParams.get("sectionId");

  if (chapterId) {
    try {
      await connectMongoDb();
      const chapter: IChapter | null = await ChaptersModel.findById(
        chapterId
      ).lean();

      return NextResponse.json({ ...chapter }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  } else if (sectionId) {
    console.log(sectionId);
    try {
      await connectMongoDb();
      const chapters: IChapter[] | null = await ChaptersModel.find({
        sectionId: sectionId,
      });
      console.log(chapters);
      return NextResponse.json(chapters, { status: 200 });
    } catch {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
