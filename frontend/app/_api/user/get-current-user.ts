import type { User } from "@/_types/user";

import { EXAMPLE_PROJECTS_DATA } from "../project/get-projects";

export const getCurrentUser = async (): Promise<User | null> => {
  return {
    id: "4",
    email: "test4@test.com",
    name: "Alice",
    skills: ["Frontend", "Design"],
    techStack: ["JavaScript", "React", "Photoshop"],
    projects: EXAMPLE_PROJECTS_DATA,
  };
};
