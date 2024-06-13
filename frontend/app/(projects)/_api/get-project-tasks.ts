import type { ProjectTaskDto } from "@/_types/dto/dto";

import { serverFetch } from "@/_utils/fetch/server-fetch";

export const getProjectTasks = async (
  projectId: number,
): Promise<Array<ProjectTaskDto>> => {
  const res = await serverFetch(`/ProjectTask/${projectId}`);

  if (!res.ok) {
    throw new Error(`Error while fetching /ProjectTask/${projectId}`);
  }

  return (await res.json()) as Array<ProjectTaskDto>;
};
