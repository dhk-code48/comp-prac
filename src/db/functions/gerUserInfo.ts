import { IUser } from "@/types";

export default async function getUserInfo(
  userId: string
): Promise<IUser | null> {
  const URL = process.env.NEXT_CLIENT_URL;
  if (!URL) throw Error;

  const response = await fetch(URL + "/api/users?id=" + userId).then((res) =>
    res.json()
  );

  const userInfo: IUser = response;

  return userInfo;
}
