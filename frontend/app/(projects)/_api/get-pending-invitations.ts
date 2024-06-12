import type { InvitationDto } from "@/_types/dto/dto";

import { serverFetch } from "@/_utils/fetch/server-fetch";

export const getPendingInvitations = async (): Promise<
  Array<InvitationDto>
> => {
  const res = await serverFetch(`/Invitation/pending`);

  if (!res.ok) {
    throw new Error(`Error while fetching /Invitation/pending`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (await res.json()) as Array<InvitationDto>;
};
