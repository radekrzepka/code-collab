import type { GetUserDto } from "@/_types/dto/dto";

import { serverFetch } from "@/_utils/fetch/server-fetch";

export const getCurrentUser = async (): Promise<GetUserDto | null> => {
  const res = await serverFetch("/User/current");

  if (res && res.status === 401) {
    return null;
  }

  if (!res || !res.ok) {
    console.error(res);
    throw new Error("Error while fetching /User/current");
  }

  return (await res.json()) as GetUserDto;
};
