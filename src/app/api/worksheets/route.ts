import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import { addWorkSheet } from "@/db/create/addWorkSheets";
import WorkSheetModel from "@/models/WorkSheetSchema";
import { Worksheet, organizeByChapters } from "@/lib/ogranizeByChapters";
import fs, { writeFile } from "fs";
import formidable from "formidable";
import { arrayBuffer } from "stream/consumers";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const pdffile = data.get("file");
    const userId = data.get("userId")?.toString();
    const title = data.get("title")?.toString();
    const gradeId = data.get("gradeId")?.toString();
    const sectionId = data.get("sectionId")?.toString();
    const chapterId = data.get("chapterId")?.toString();

    if (!pdffile || !userId || !title || !gradeId || !sectionId || !chapterId) {
      return new Response(JSON.stringify({ message: "Incomplete data" }), {
        status: 400,
      });
    }

    const byteData = await pdffile.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/pdf/${title}${sectionId}.pdf`;

    writeFile(path, buffer, (err) => {
      console.log("ERROR => ", err);
    });

    await connectMongoDb();

    const adminUser = await UserSchema.findById(userId);

    if (!adminUser) {
      return new Response("User not found", { status: 403 });
    }

    if (
      (adminUser.role === "teacher" &&
        adminUser.assignedSections.includes(sectionId)) ||
      adminUser.role === "superadmin"
    ) {
      const worksheet = await addWorkSheet(
        title,
        gradeId,
        sectionId,
        chapterId
      );
      return new Response(
        JSON.stringify({
          worksheet: { ...worksheet },
          message: "Worksheet Created",
        }),
        {
          status: 201,
        }
      );
    } else {
      return new Response(JSON.stringify({ error: "Permission Denied" }), {
        status: 403,
      });
    }
  } catch (error) {
    console.log("ERROR => ", error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
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
  const chapterId = request.nextUrl.searchParams.get("chapterId");
  const worksheetId = request.nextUrl.searchParams.get("worksheetId");

  await connectMongoDb();
  if (sectionsId) {
    try {
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
  if (chapterId) {
    try {
      const worksheets = await WorkSheetModel.find({
        chapterId: chapterId,
      }).lean();
      if (worksheets) {
        return NextResponse.json({ worksheets }, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "No worksheets found" },
          { status: 404 }
        );
      }
    } catch {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  }
  if (worksheetId) {
    try {
      const worksheet = await WorkSheetModel.findById(worksheetId).lean();
      return NextResponse.json({ ...worksheet }, { status: 200 });
    } catch {
      return NextResponse.json({ error: "An Error Occured" }, { status: 500 });
    }
  }
}
