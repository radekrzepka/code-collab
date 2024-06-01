import type { Project } from "@/_types/project";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/_components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { imagesRoutes, routes } from "@/_utils/routes";

interface BrowseProjectCardProps {
  project: Project;
  hideLookingFor?: boolean;
}

export const BrowseProjectCard = ({
  project: { description, id, name, lookingForSkills, technologyStack },
  hideLookingFor = false,
}: BrowseProjectCardProps) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4">
        <Image
          alt="Project Thumbnail"
          className="mx-auto"
          height={100}
          src={imagesRoutes.BROWSE_PROJECT_PLACEHOLDER}
          width={150}
        />
        <p className="text-gray-400">{description}</p>
        <div className="flex flex-col gap-2">
          {!hideLookingFor && (
            <>
              {" "}
              <p>Looking for: </p>
              <div className=" flex flex-wrap gap-2">
                {lookingForSkills.map((skill) => (
                  <Badge variant="outline" key={skill}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </>
          )}
          <p>Tech stack: </p>
          <div className="flex flex-wrap gap-2">
            {technologyStack.map((technology) => (
              <Badge variant="outline" key={technology}>
                {technology}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
          href={routes.PROJECT(id)}
        >
          View Project
        </Link>
      </CardFooter>
    </Card>
  );
};
