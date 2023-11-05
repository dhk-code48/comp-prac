export const getChapterDetails = async (id: string) => {
  try {
    return await fetch(
      process.env.NEXT_CLIENT_URL + "/api/chapters?chapterId=" + id || ""
    ).then((res) => (res ? res.json() : []));
  } catch {
    console.log("ERROR");
    return null;
  }
};
