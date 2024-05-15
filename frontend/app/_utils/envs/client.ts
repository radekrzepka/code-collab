import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_ALLOW_SOCIAL_MEDIA_REGISTER: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_ALLOW_SOCIAL_MEDIA_REGISTER:
      process.env.NEXT_PUBLIC_ALLOW_SOCIAL_MEDIA_REGISTER,
  },
});
