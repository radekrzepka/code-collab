import Link from "next/link";
import { ListIcon } from "lucide-react";

import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { Input } from "@/_components/ui/input";

const BrowseProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Find project for yourself
      </h2>
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="w-full max-w-md">
          <Input
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            placeholder="Search projects..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2" variant="outline">
                <ListIcon className="h-5 w-5" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="newest">
                <DropdownMenuRadioItem value="newest">
                  Newest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  Oldest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="popular">
                  Most Popular
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Build a Todo App</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Collaborate with other beginner programmers to build a simple
                todo app using React and Firebase.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>React</Badge>
              <Badge>Firebase</Badge>
              <Badge>Beginner</Badge>
            </div>
            <div className="flex justify-between">
              <Link
                className="font-medium text-blue-500 hover:underline"
                href="#"
              >
                Learn More
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <Link
                  className="font-medium text-blue-500 hover:underline"
                  href="#"
                >
                  Sign up
                </Link>
                {" \n                            "}or
                <Link
                  className="font-medium text-blue-500 hover:underline"
                  href="#"
                >
                  log in
                </Link>
                to join this project.
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Build a Weather App</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Join a team of beginner programmers to create a weather app
                using JavaScript and an API.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>JavaScript</Badge>
              <Badge>API</Badge>
              <Badge>Beginner</Badge>
            </div>
            <div className="flex justify-between">
              <Link
                className="font-medium text-blue-500 hover:underline"
                href="#"
              >
                Learn More
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <Link
                  className="font-medium text-blue-500 hover:underline"
                  href="#"
                >
                  Sign up
                </Link>
                {" \n                            "}or
                <Link
                  className="font-medium text-blue-500 hover:underline"
                  href="#"
                >
                  log in
                </Link>
                to join this project.
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Build a Blog Website</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Collaborate with other beginner programmers to build a simple
                blog website using HTML, CSS, and JavaScript.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>HTML</Badge>
              <Badge>CSS</Badge>
              <Badge>JavaScript</Badge>
              <Badge>Beginner</Badge>
            </div>
            <div className="flex justify-between">
              <Link
                className="font-medium text-blue-500 hover:underline"
                href="#"
              >
                Learn More
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <Link
                  className="font-medium text-blue-500 hover:underline"
                  href="#"
                >
                  Sign up
                </Link>
                {" \n                            "}or
                <Link
                  className="font-medium text-blue-500 hover:underline"
                  href="#"
                >
                  log in
                </Link>
                to join this project.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrowseProjectsPage;
