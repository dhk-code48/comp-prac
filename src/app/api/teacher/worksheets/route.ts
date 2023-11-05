import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import { addWorkSheet } from "@/db/create/addWorkSheets";
import WorkSheetModel from "@/models/WorkSheetSchema";
import { Worksheet, organizeByChapters } from "@/lib/ogranizeByChapters";
import WStates from "@/models/StateSchema";

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

    const allStudentsData = await UserSchema.find({ role: "student" });

    // for (let i = 0; i < allStudentsData.length; i++) {
    //   const studentData = allStudentsData[i];

    //   const studentWorksheetState = await WStates.create({
    //     gradeId:gradeId,
    //     sectionId:sectionId,

    //   })

    // }

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
