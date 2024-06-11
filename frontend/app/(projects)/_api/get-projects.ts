import type { GetProjectDto } from "@/_types/dto/dto";

import { serverFetch } from "@/_utils/fetch/server-fetch";

export const getProjects = async (): Promise<Array<GetProjectDto>> => {
  const res = await serverFetch("/Project");

  if (!res.ok) {
    throw new Error("Error while fetching /Project");
  }

  return (await res.json()) as Array<GetProjectDto>;
};
