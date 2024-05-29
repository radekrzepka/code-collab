import type { User } from "@/_types/user";
import Link from "next/link";

import { routes } from "@/_utils/routes";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface DeveloperCardProps {
  developer: User;
}

export const DeveloperCard = ({
  developer: { id, name, skills, techStack },
}: DeveloperCardProps) => {
  return (
    <div key={id}>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>
            {name.slice(0, 2).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Link href={routes.DEVELOPER(id)} className="mb-1 text-2xl font-bold">
          {name}
        </Link>
      </div>
      <div className="ml-[3.25rem] flex flex-wrap gap-2">
        <p>Skills: </p>
        {skills.map((skill) => (
          <Badge variant="outline" key={skill}>
            {skill}
          </Badge>
        ))}
      </div>
      <div className="ml-[3.25rem] mt-2 flex flex-wrap gap-2">
        <p>Technology stack: </p>
        {techStack.map((technology) => (
          <Badge variant="outline" key={technology}>
            {technology}
          </Badge>
        ))}
      </div>
    </div>
  );
};
