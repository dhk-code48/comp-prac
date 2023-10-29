import UserModel from "@/models/UserSchema";
import { IUser } from "@/types";

async function updateUser(
  userId: string,
  updatedData: Partial<IUser>
): Promise<IUser | null> {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export { updateUser };
