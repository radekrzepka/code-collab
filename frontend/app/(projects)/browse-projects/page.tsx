import { Input } from "@/_components/ui/input";
import { getProjects } from "@/(projects)/_api/get-projects";

import { BrowseProjectCard } from "../_components/browse-project-card";

const BrowseProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <section className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
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
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <BrowseProjectCard project={project} key={project.id} />
        ))}
      </div>
    </section>
  );
};

export default BrowseProjectsPage;
