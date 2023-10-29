import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongodb";
import UserSchema from "@/models/UserSchema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { assignedSections, email, password, name, role } =
    await request.json();

  // Connect to the MongoDB database.
  await connectMongoDb();
  const hashedPassword = await bcrypt.hash(password, 10);
  const getUser = await UserSchema.findOne({ email });

  if (getUser) {
    return NextResponse.json({ error: "User already Exist" }, { status: 500 });
  }

  await UserSchema.create({
    role,
    assignedSections,
    email,
    name,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 }); // Bad Request
    }
    // Connect to the MongoDB database
    await connectMongoDb();

    // Find the user by ID
    const user = await UserSchema.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 }); // Not Found
    }

    return NextResponse.json(user, { status: 200 }); // OK
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching user information" },
      { status: 500 }
    ); // Internal Server Error
  }
}
