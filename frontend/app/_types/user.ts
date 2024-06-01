import type { Project } from "./project";

export interface User {
  id: string;
  name: string;
  bio: string;
  email: string;
  skills: Array<string>;
  techStack: Array<string>;
  projects: Array<Project>;
}
