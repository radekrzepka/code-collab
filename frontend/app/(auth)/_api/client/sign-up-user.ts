/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { DefaultApiResponseDto, RegisterUserDto } from "@/_types/dto/dto";

import { clientFetch } from "@/_utils/fetch/client-fetch";

export const signUpUser = async (body: RegisterUserDto): Promise<void> => {
  const res = await clientFetch("/User/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = (await res.json()) as DefaultApiResponseDto;

    throw new Error(err.message);
  }
};
