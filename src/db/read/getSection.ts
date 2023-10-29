interface ISNG {
  section: string;
  grade: string;
}

export const getSectionAndGrade = async (id: string): Promise<ISNG | null> => {
  if (!process.env.NEXT_CLIENT_URL) return null;

  const infoRes = await fetch(
    process.env.NEXT_CLIENT_URL + "/api/section?id=" + id
  );

  if (!infoRes.ok) return null;

  const sectionNgrade: ISNG | null = await infoRes.json();

  if (sectionNgrade) {
    return sectionNgrade;
  } else {
    return null;
  }
};
