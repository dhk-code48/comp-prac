import UserModel from "@/models/UserSchema";
import { IUser } from "@/types";

async function addUser(
  role: string,
  name: string,
  assignedSections: string[],
  email: string,
  password: string
): Promise<IUser> {
  try {
    const newUser = new UserModel({
      role,
      name,
      assignedSections,
      email,
      password,
    });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
}

export { addUser };
