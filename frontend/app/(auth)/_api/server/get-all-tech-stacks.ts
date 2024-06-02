import type { TechStackDto } from "@/_types/dto/dto";

import { serverFetch } from "@/_utils/fetch/server-fetch";

export const getAllTechStacks = async (): Promise<Array<TechStackDto>> => {
  const res = await serverFetch("/TechStack");

  if (!res.ok) {
    throw new Error("Error while fetching /TechStack");
  }

  return (await res.json()) as Array<TechStackDto>;
};
