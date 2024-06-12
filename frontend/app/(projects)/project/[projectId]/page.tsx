import Link from "next/link";

import { Badge } from "@/_components/ui/badge";
import { getCurrentUser } from "@/(auth)/_api/server/get-current-user";
import { SignInDialog } from "@/(auth)/_components/sign-in-dialog";
import { DeveloperCard } from "@/(developers)/_components/developer-card";
import { getProject } from "@/(projects)/_api/get-project";
import { JoinProjectDialog } from "@/(projects)/_components/join-project-dialog";

const ProjectPage = async ({
  params: { projectId },
}: {
  params: { projectId: string };
}) => {
  const [currentUser, project] = await Promise.all([
    getCurrentUser(),
    getProject(parseInt(projectId)),
  ]);

  const {
    description,
    githubLink,
    skills,
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
          <h2 className="text-xl font-bold">Required skills: </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge variant="destructive" key={skill}>
                {skill}
              </Badge>
            ))}
          </div>
          <h2 className="text-xl font-bold">Tech stack: </h2>
          <div className="flex flex-wrap gap-2">
            {technologyStack.map((technology) => (
              <Badge variant="destructive" key={technology}>
                {technology}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          {currentUser &&
            !developers.some((dev) => dev.id === currentUser?.id) && (
              <JoinProjectDialog project={project} />
            )}
          {!currentUser && <SignInDialog project={project} />}
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
            href={githubLink}
            target="_blank"
          >
            View on GitHub
          </Link>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-bold">Owner: </h2>
          <div className="flex gap-y-2">
            <DeveloperCard
              key={owner.id}
              developer={owner}
              currentUser={currentUser || undefined}
            />
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-bold">Current Team: </h2>
          <div className="flex gap-2">
            {developers.map((developer) => (
              <DeveloperCard
                key={developer.id}
                developer={developer}
                currentUser={currentUser || undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectPage;
