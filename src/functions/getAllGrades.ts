import { IGrade } from "@/types";

const getAllGradesInfo = async (): Promise<IGrade[] | null> => {
  try {
    const baseurl = process.env.CLIENT_URL;
    const apiUrl = baseurl + "/api/grades";

    if (!baseurl) return null;

    const allGradesInfo = await fetch(apiUrl).then((res) => res && res.json());

    return allGradesInfo;
  } catch {
    return null;
  }
};
export default getAllGradesInfo;
