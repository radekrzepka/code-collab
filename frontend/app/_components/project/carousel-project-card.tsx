import type { Project } from "@/_types/project";

import { CarouselItem } from "../ui/carousel";
import { BrowseProjectCard } from "./browse-project-card";

interface CarouselProjectCardProps {
  project: Project;
}

export const CarouselProjectCard = ({ project }: CarouselProjectCardProps) => {
  return (
    <CarouselItem className="basis-full pl-4 lg:basis-1/2 xl:basis-1/3">
      <BrowseProjectCard project={project} />
    </CarouselItem>
  );
};
