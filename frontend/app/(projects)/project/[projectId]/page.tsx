import Link from "next/link";

import { getProject } from "@/_api/project/get-project";
import { getCurrentUser } from "@/_api/user/get-current-user";
import { DeveloperCard } from "@/_components/developer/developer-card";
import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";

const ProjectPage = async ({
  params: { projectId },
}: {
  params: { projectId: string };
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUser, project] = await Promise.all([
    getCurrentUser(),
    getProject(projectId),
  ]);

  const {
    description,
    githubLink,
    lookingForSkills,
    name,
    technologyStack,
    developers,
    owner,
  } = project;

  return (
    <main className="w-full">
      <section className="container grid gap-4 py-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {name}
        </h1>
        <p className="md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {description}
        </p>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Looking for: </h2>
          <div className="flex flex-wrap gap-2">
            {lookingForSkills.map((skill) => (
              <Badge variant="outline" key={skill}>
                {skill}
              </Badge>
            ))}
          </div>
          <h2 className="text-xl font-bold">Tech stack: </h2>
          <div className="flex flex-wrap gap-2">
            {technologyStack.map((technology) => (
              <Badge variant="outline" key={technology}>
                {technology}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Button>Join Project</Button>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
            href={githubLink}
          >
            View on GitHub
          </Link>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-bold">Owner: </h2>
          <div className="flex flex-col gap-y-2">
            <DeveloperCard key={owner.id} developer={owner} />
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-bold">Current Team: </h2>
          <div className="flex flex-col gap-y-2">
            {developers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectPage;
