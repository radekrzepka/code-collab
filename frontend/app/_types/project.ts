import type { User } from "./user";

export interface Project {
  id: string;
  name: string;
  description: string;
  skills: Array<string>;
  technologyStack: Array<string>;
  owner: User;
  developers: Array<User>;
  githubLink: string;
}
