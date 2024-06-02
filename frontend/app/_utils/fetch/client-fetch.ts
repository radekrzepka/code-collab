import Cookies from "js-cookie";

import { env } from "../envs/client";

export const clientFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const baseUrl = env.NEXT_PUBLIC_API_URL;

  const headers: HeadersInit = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    credentials: "include",
    ...options.headers,
  });

  const authToken = Cookies.get("authToken");

  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  return response;
};
