import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: { ALLOW_SOCIAL_MEDIA_REGISTER: z.string() },
  runtimeEnv: {
    ALLOW_SOCIAL_MEDIA_REGISTER: process.env.ALLOW_SOCIAL_MEDIA_REGISTER,
  },
});
