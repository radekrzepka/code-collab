"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";

import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { routes } from "@/_utils/routes";

import { Avatar, AvatarFallback } from "../ui/avatar";

interface UserDropdownMenuProps {
  userName: string;
}

export const UserDropdownMenu = ({ userName }: UserDropdownMenuProps) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto rounded-full" size="icon" variant="ghost">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {userName.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              Cookies.remove("authToken");
              router.push(routes.MAIN);
              router.refresh();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
