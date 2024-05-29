import type { Project } from "@/_types/project";

import { EXAMPLE_PROJECTS_DATA } from "./get-projects";

export const getProject = (projectId: string) => {
  return EXAMPLE_PROJECTS_DATA.find(
    (project) => project.id === projectId,
  ) as Project;
};
