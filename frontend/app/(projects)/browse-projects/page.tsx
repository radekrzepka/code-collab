import { getProjects } from "@/(projects)/_api/get-projects";

import { BrowseProjectCard } from "../_components/browse-project-card";

const BrowseProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <section className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Find project for yourself
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <BrowseProjectCard project={project} key={project.id} />
        ))}
      </div>
    </section>
  );
};

export default BrowseProjectsPage;
