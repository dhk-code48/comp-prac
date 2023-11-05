import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import { addWorkSheet } from "@/db/create/addWorkSheets";
import WorkSheetModel from "@/models/WorkSheetSchema";
import { Worksheet, organizeByChapters } from "@/lib/ogranizeByChapters";
import fs from "fs";
import formidable from "formidable";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const userId = data.get("userId")?.toString();
    const title = data.get("title")?.toString();
    const description = data.get("description")?.toString();
    const gradeId = data.get("gradeId")?.toString();
    const sectionId = data.get("sectionId")?.toString();

    if (!file || !userId || !title || !description || !gradeId || !sectionId) {
      return NextResponse.json({ message: "No File" }, { status: 500 });
    }
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/${title}${sectionId}`;
    await writeFile(path, buffer);

    // const { userId, title, description, gradeId, sectionId, pdfLink } =
    //   await request.json();

    await connectMongoDb();

    const adminUser = await UserSchema.findById(userId);

    if (!adminUser) {
      return new NextResponse("User not found", { status: 403 });
    }

    if (
      (adminUser.role === "teacher" &&
        adminUser.assignedSections.includes(sectionId)) ||
      adminUser.role === "superadmin"
    ) {
      const worksheet = addWorkSheet(title, description, gradeId, sectionId);
      return NextResponse.json(
        { worksheet: { ...worksheet }, message: "WorkSheet Created" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Permission Denied !!" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
export async function PUT(request: NextRequest) {
  console.log("UES");
  try {
    const requestBody = await request.json();

    const { updatedData, userId, worksheetId } = requestBody;

    if (!updatedData || !userId || !worksheetId) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    await connectMongoDb();

    const adminUser = await UserSchema.findById(userId);

    if (!adminUser) {
      return NextResponse.json({ error: "User not found" }, { status: 403 });
    }

    if (adminUser.role === "teacher" || adminUser.role === "superadmin") {
      const worksheet = await WorkSheetModel.findByIdAndUpdate(
        worksheetId,
        {
          title: updatedData.title,
          state: updatedData.state,
          chapterId: updatedData.chapterId,
          description: updatedData.description,
          gradeId: updatedData.gradeId,
          sectionId: updatedData.sectionId,
          pdfLink: updatedData.pdfLink,
        },
        { new: true }
      );

      if (!worksheet) {
        return NextResponse.json(
          { error: "Worksheet not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { worksheet, message: "Worksheet Created" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Permission Denied !!" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const sectionsId = request.nextUrl.searchParams.get("sectionsId");

  await connectMongoDb();
  if (!sectionsId) {
    const worksheetId = request.nextUrl.searchParams.get("worksheetId");
    const worksheets = await WorkSheetModel.findById(worksheetId);

    if (worksheets) {
      return NextResponse.json({ worksheets }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No worksheets found" },
        { status: 404 }
      );
    }

    if (!worksheetId)
      return NextResponse.json(
        { error: "sectionsId parameter is missing" },
        { status: 400 }
      );
  } else {
    try {
      // Find worksheets by section IDs
      const worksheets: Worksheet[] = await WorkSheetModel.find({
        sectionId: { $in: JSON.parse(sectionsId) },
      });

      if (worksheets.length > 0) {
        return NextResponse.json({ worksheets }, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "No worksheets found" },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error("Error in GET request:", error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
}
