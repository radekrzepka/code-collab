import type { CreateInvitationDto } from "@/_types/dto/dto";

import { clientFetch } from "@/_utils/fetch/client-fetch";

export const createInvitation = async (
  body: CreateInvitationDto,
): Promise<void> => {
  const res = await clientFetch("/Invitation", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error while creating invitation");
  }

  return;
};
