import type { Developer } from "@/_types/developer";
import type { User } from "@/_types/user";

import { Avatar, AvatarFallback } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { Card, CardContent } from "@/_components/ui/card";
import { InviteUserToProjectDialog } from "@/(projects)/_components/invite-user-to-project-dialog";

interface DeveloperCardProps {
  developer: Developer;
  currentUser?: User;
  hideSkills?: boolean;
}

export const DeveloperCard = ({
  developer,
  currentUser,
  hideSkills = false,
}: DeveloperCardProps) => {
  const { name, skills, techStack, bio, id } = developer;

  const hasOwnProjects = !!currentUser?.projects.find(
    (project) => project.owner.id === currentUser?.id,
  );

  return (
    <Card className="max-w-md">
      <CardContent className="flex flex-col justify-between gap-2 p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {name.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xg mb-1 font-bold">
              {name} {currentUser?.id === id && "(you)"}
            </h2>
          </div>
          <p className="text-sm">{bio}</p>
        </div>

        {!hideSkills && (
          <>
            <h2 className="text-lg font-semibold">Skills: </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge variant="destructive" key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
            <h2 className="text-lg font-semibold">Tech skills: </h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((technology) => (
                <Badge variant="destructive" key={technology}>
                  {technology}
                </Badge>
              ))}
            </div>
          </>
        )}

        {hasOwnProjects && currentUser && currentUser?.id !== id && (
          <InviteUserToProjectDialog owner={currentUser} user={developer} />
        )}
      </CardContent>
    </Card>
  );
};
