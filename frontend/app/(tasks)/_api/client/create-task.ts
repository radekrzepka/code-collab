import type { CreateProjectTaskDto } from "@/_types/dto/dto";

import { clientFetch } from "@/_utils/fetch/client-fetch";

export const createTask = async (body: CreateProjectTaskDto): Promise<void> => {
  const res = await clientFetch("/ProjectTask", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error while creating task");
  }

  return;
};
