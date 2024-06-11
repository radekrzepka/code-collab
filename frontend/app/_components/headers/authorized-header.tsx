import type { User } from "@/_types/user";
import Link from "next/link";

import { routes } from "@/_utils/routes";

import { CodeCollabIcon } from "../icons";
import { UserDropdownMenu } from "./user-dropdown-menu";

interface AuthorizedHeaderProps {
  currentUser: User;
}

export const AuthorizedHeader = ({
  currentUser: { name },
}: AuthorizedHeaderProps) => {
  return (
    <header className="flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6 lg:py-8">
      <Link className="flex items-center gap-2" href={routes.MAIN}>
        <CodeCollabIcon className="h-8 w-8" />
        <span className="whitespace-nowrap text-2xl font-semibold">
          Code Collab
        </span>
      </Link>
      <nav className="flex flex-row items-center gap-5 text-sm font-medium sm:flex lg:gap-6">
        <Link
          className="whitespace-nowrap text-gray-500 hover:text-white"
          href={routes.CREATE_PROJECT}
        >
          Create Project
        </Link>
        <Link
          className="whitespace-nowrap text-gray-500 hover:text-white"
          href={routes.BROWSE_PROJECTS}
        >
          Find Projects
        </Link>
        <Link
          className="whitespace-nowrap text-gray-500 hover:text-white"
          href={routes.BROWSE_DEVELOPERS}
        >
          Find Developers
        </Link>
      </nav>
      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <UserDropdownMenu userName={name} />
      </div>
    </header>
  );
};
