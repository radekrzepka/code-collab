import type { LoginUserDto, TokenDto } from "@/_types/dto/dto";

import { clientFetch } from "@/_utils/fetch/client-fetch";

export const signInUser = async (body: LoginUserDto): Promise<TokenDto> => {
  const res = await clientFetch("/User/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res || !res.ok) {
    throw new Error("Failed to log in");
  }

  return (await res.json()) as TokenDto;
};
