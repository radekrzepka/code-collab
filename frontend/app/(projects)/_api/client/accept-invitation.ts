import { clientFetch } from "@/_utils/fetch/client-fetch";

export const acceptInvitation = async (invitationId: number): Promise<void> => {
  const res = await clientFetch(`/Invitation/accept/${invitationId}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Error while accepting invitation");
  }

  return;
};
