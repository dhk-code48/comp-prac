import { IGrade } from "@/types";

const addGrade = async (
  grade: string,
  userId: string
): Promise<IGrade | null> => {
  try {
    const baseurl = process.env.CLIENT_URL;
    const apiUrl = baseurl + "/api/grades";

    if (!baseurl) {
      console.log("Umm");
      return null;
    }

    const newGrade = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        grade,
        userId,
      }),
    }).then((res) => res && res.json());

    return newGrade;
  } catch {
    return null;
  }
};
export default addGrade;
