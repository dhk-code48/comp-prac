export const getChapterDetails = async (id: string) => {
  try {
    return await fetch(
      process.env.CLIENT_URL + "/api/chapters?chapterId=" + id || ""
    ).then((res) => (res ? res.json() : []));
  } catch {
    return null;
  }
};
