import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IUser } from "@/types";
import { getServerSession } from "next-auth";

export const getUserData = async (): Promise<IUser | null> => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  if (!process.env.NEXT_CLIENT_URL) return null;

  const infoRes = await fetch(
    process.env.NEXT_CLIENT_URL + "/api/users?id=" + session.user.id
  );

  if (!infoRes.ok) {
    return null;
  }

  const userData: IUser | null = await infoRes.json();

  if (userData) {
    return userData;
  } else {
    return null;
  }
};
