import type { GetProjectDto } from "@/_types/dto/dto";

import { serverFetch } from "@/_utils/fetch/server-fetch";

export const getProject = async (projectId: number): Promise<GetProjectDto> => {
  const res = await serverFetch(`/Project/${projectId}`);

  if (!res.ok) {
    throw new Error(`Error while fetching /Project/${projectId}`);
  }

  return (await res.json()) as GetProjectDto;
};
