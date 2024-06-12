import type { User } from "@/_types/user";

import { getPendingInvitations } from "@/(projects)/_api/get-pending-invitations";
import { BrowseProjectCard } from "@/(projects)/_components/browse-project-card";
import { JoinProjectActivityFeedCard } from "@/(projects)/_components/join-project-activity-feed-card";

interface DashboardProps {
  currentUser: User;
}

export const Dashboard = async ({
  currentUser: { name, projects },
}: DashboardProps) => {
  const pendingInvitations = await getPendingInvitations();

  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
      <div className="mx-auto flex w-full max-w-6xl items-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">
          Welcome, {name}!
        </h1>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4">
        <h1 className="text-2xl font-semibold">Activity Feed</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pendingInvitations.map((invitation) => (
          <JoinProjectActivityFeedCard
            key={invitation.id}
            invitation={invitation}
          />
        ))}
      </div>
      <div>
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4">
          <h1 className="mb-4 text-2xl font-semibold">Your Projects</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <BrowseProjectCard
              project={project}
              hideLookingFor
              key={project.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
