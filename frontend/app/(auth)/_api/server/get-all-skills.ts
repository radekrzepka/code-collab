import type { SkillDto } from "@/_types/dto/dto";

import { serverFetch } from "@/_utils/fetch/server-fetch";

export const getAllSkills = async (): Promise<Array<SkillDto>> => {
  const res = await serverFetch("/Skill");

  if (!res.ok) {
    throw new Error("Error while fetching /Skill");
  }

  return (await res.json()) as Array<SkillDto>;
};
