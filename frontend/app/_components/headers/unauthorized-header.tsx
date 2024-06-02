import Link from "next/link";

import { routes } from "@/_utils/routes";

import { CodeCollabIcon } from "../icons/custom-icons/code-collab-icon";

export const UnauthorizedHeader = () => {
  return (
    <header className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-6 md:flex-row md:px-6 lg:py-8">
      <Link className="flex items-center gap-2" href={routes.MAIN}>
        <CodeCollabIcon className="h-8 w-8" />
        <span className="text-2xl font-semibold">Code Collab</span>
      </Link>
      <nav className="flex flex-row items-center gap-5 text-sm font-medium sm:flex lg:gap-6">
        <Link
          className="whitespace-nowrap text-gray-500 dark:text-gray-400"
          href={routes.BROWSE_PROJECTS}
        >
          Find Projects
        </Link>
        <Link
          className="whitespace-nowrap text-gray-500 dark:text-gray-400"
          href={routes.BROWSE_DEVELOPERS}
        >
          Find Developers
        </Link>
      </nav>
      <div className="flex w-full flex-col items-center gap-2 md:w-auto md:flex-row">
        <Link
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 md:w-auto"
          href={routes.SIGN_IN}
        >
          Sign In
        </Link>
        <Link
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-50 px-6 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 md:w-auto"
          href={routes.SIGN_UP}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};
