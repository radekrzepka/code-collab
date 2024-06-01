import type { User } from "@/_types/user";

import { EXAMPLE_PROJECTS_DATA } from "@/(projects)/_api/get-projects";

export const getCurrentUser = async (): Promise<User | null> => {
  // return null;
  return {
    id: "4",
    email: "test4@test.com",
    name: "Alice",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at tempor enim. Fusce cursus semper urna, a rutrum dolor cursus a. Sed nec porttitor diam. Ut eget porttitor tortor, ac dignissim mauris. Nullam lorem magna, faucibus non mattis sed, consectetur quis libero. Duis ultrices felis sed metus porttitor pretium",
    skills: ["Frontend", "Design"],
    techStack: ["JavaScript", "React", "Photoshop"],
    projects: EXAMPLE_PROJECTS_DATA,
  };
};
