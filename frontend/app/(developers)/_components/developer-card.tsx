import type { Developer } from "@/_types/developer";

import { Avatar, AvatarFallback } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { Card, CardContent } from "@/_components/ui/card";

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard = ({
  developer: { name, skills, techStack, bio },
}: DeveloperCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {name.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xg mb-1 font-bold">{name}</h2>
          </div>
          <p className="text-sm">{bio}</p>
        </div>
        <h2 className="text-lg font-semibold">Skills: </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge variant="outline" key={skill}>
              {skill}
            </Badge>
          ))}
        </div>
        <h2 className="text-lg font-semibold">Tech skills: </h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((technology) => (
            <Badge variant="outline" key={technology}>
              {technology}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
