import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import { addWorkSheet } from "@/db/create/addWorkSheets";
import WorkSheetModel from "@/models/WorkSheetSchema";
import { Worksheet, organizeByChapters } from "@/lib/ogranizeByChapters";
import WStates from "@/models/StateSchema";
import ChaptersModel from "@/models/ChaptersSchema";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const title = data.get("title")?.toString();
    const gradeId = data.get("gradeId")?.toString();
    const chapter = data.get("chapter")?.toString();
    const sectionId = data.get("sectionId")?.toString();

    if (!file || !title || !gradeId || !sectionId) {
      return NextResponse.json({ message: "No File" }, { status: 500 });
    }
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/${title}${sectionId}`;
    await writeFile(path, buffer);

    await connectMongoDb();

    const doesChapterExits = await ChaptersModel.find({ title: chapter });

    const newChapter =
      doesChapterExits &&
      (await ChaptersModel.create({
        title: chapter,
        sectionId: sectionId,
        gradeId: gradeId,
      }));

    const worksheet = addWorkSheet(title, gradeId, sectionId);
    return NextResponse.json(
      { worksheet: { ...worksheet }, message: "WorkSheet Created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const sectionsId = request.nextUrl.searchParams.get("sectionsId");
  if (sectionsId) {
    try {
      await connectMongoDb();
      const worksheets: Worksheet[] = await WorkSheetModel.find({
        sectionId: { $in: JSON.parse(sectionsId) },
      });
      const data = worksheets
        ? worksheets
        : { error: "CAN'T FETCH WORKSHEETS !!" };
      console.log("WORKSHEETS => ", worksheets);
      // Ensure that the result is converted to plain JavaScript objects.

      if (worksheets) {
        return NextResponse.json(data, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "An error occurred" },
          { status: 500 }
        );
      }
    } catch (error) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
