import Link from "next/link";

import { routes } from "@/_utils/routes";

import { CodeCollabIcon } from "../icons/custom-icons/code-collab-icon";

export const UnauthorizedHeader = () => {
  return (
    <header className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6 lg:py-8">
      <Link className="flex items-center gap-2" href={routes.MAIN}>
        <CodeCollabIcon className="h-8 w-8" />
        <span className="text-2xl font-semibold">Code Collab</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
          href={routes.SIGN_IN}
        >
          Sign In
        </Link>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-6 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
          href={routes.SIGN_UP}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};
