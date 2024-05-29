import type { User } from "@/_types/user";
import Link from "next/link";
import { CodeIcon } from "lucide-react";

import { routes } from "@/_utils/routes";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

interface AuthorizedHeaderProps {
  currentUser: User;
}

export const AuthorizedHeader = ({
  currentUser: { name, id },
}: AuthorizedHeaderProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center border-b px-4 md:px-6">
      <Link
        className="mr-4 flex items-center gap-2 text-lg font-semibold sm:text-base"
        href="#"
      >
        <CodeIcon className="h-6 w-6" />
        <span className="sr-only">CodeCollab</span>
      </Link>
      <nav className="hidden flex-row items-center gap-5 text-sm font-medium sm:flex lg:gap-6">
        <Link className="font-bold" href="#">
          Dashboard
        </Link>
        <Link className="text-gray-500 dark:text-gray-400" href="#">
          Find Projects
        </Link>
        <Link className="text-gray-500 dark:text-gray-400" href="#">
          Find Developers
        </Link>
        <Link className="text-gray-500 dark:text-gray-400" href="#">
          Notifications
        </Link>
        <Link className="text-gray-500 dark:text-gray-400" href="#">
          Account Settings
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button className="ml-auto rounded-full" size="icon" variant="ghost">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {name.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
};
