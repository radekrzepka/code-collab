import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { imagesRoutes } from "@/_utils/routes";

import { Badge } from "../ui/badge";

interface BrowseProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    skills: Array<string>;
  };
}

export const BrowseProjectCard = ({
  project: { description, name, skills },
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
        <div className="my-2 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge variant={"outline"} key={skill}>
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
          href="#"
        >
          View Project
        </Link>
      </CardFooter>
    </Card>
  );
};