import { cookies } from "next/headers";

import { env } from "../envs/server";

export const serverFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const baseUrl = env.API_URL;

  const headers: HeadersInit = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    credentials: "include",
    ...options.headers,
  });

  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");

  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken.value}`);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  return response;
};
