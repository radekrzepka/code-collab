import type { UserListDto } from "@/_types/dto/dto";

import { serverFetch } from "@/_utils/fetch/server-fetch";

export const getAllDevelopers = async (): Promise<Array<UserListDto>> => {
  const res = await serverFetch("/User");

  if (!res.ok) {
    throw new Error("Error while fetching /Skill");
  }

  return (await res.json()) as Array<UserListDto>;
};
