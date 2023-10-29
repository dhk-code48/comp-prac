import UserModel from "@/models/UserSchema";

async function deleteUser(userId: string): Promise<void> {
  try {
    await UserModel.findByIdAndRemove(userId);
  } catch (error) {
    throw error;
  }
}

export { deleteUser };
