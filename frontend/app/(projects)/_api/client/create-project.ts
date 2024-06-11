import type { CreateProjectDto } from "@/_types/dto/dto";

import { clientFetch } from "@/_utils/fetch/client-fetch";

export const createProject = async (body: CreateProjectDto): Promise<void> => {
  const res = await clientFetch("/Project", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error while creating project");
  }

  return;
};
