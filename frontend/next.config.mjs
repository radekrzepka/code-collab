import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./app/_utils/envs/client.ts");
jiti("./app/_utils/envs/server.ts");

/** @type {import('next').NextConfig} */
export default {};
