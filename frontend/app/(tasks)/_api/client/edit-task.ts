import type { CreateProjectTaskDto } from "@/_types/dto/dto";

import { clientFetch } from "@/_utils/fetch/client-fetch";

export const editTask = async (
  body: CreateProjectTaskDto,
  taskId: number,
): Promise<void> => {
  const res = await clientFetch(`/ProjectTask/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error while editing task");
  }

  return;
};
