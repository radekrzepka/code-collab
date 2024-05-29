import { ListIcon } from "lucide-react";

import { getProjects } from "@/_api/project/get-projects";
import { BrowseProjectCard } from "@/_components/project/browse-project-card";
import { Button } from "@/_components/ui/button";
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

const BrowseProjectsPage = async () => {
  const projects = await getProjects();

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
        {projects.map((project) => (
          <BrowseProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default BrowseProjectsPage;
