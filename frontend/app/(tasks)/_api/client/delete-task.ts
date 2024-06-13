import { clientFetch } from "@/_utils/fetch/client-fetch";

export const deleteTask = async (taskId: number): Promise<void> => {
  const res = await clientFetch(`/ProjectTask/${taskId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error while creating task");
  }

  return;
};
