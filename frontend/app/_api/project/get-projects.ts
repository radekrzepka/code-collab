import type { Project } from "@/_types/project";
import type { User } from "@/_types/user";

const EXAMPLE_USERS_DATA = [
  {
    id: "1",
    email: "test@test.com",
    name: "Narixoo",
    skills: ["Frontend", "Backend"],
    techStack: ["JavaScript", "TypeScript", "React", "Node.js"],
    projects: [],
  },
  {
    id: "2",
    email: "test2@test.com",
    name: "John Doe",
    skills: ["Frontend", "UX/UI"],
    techStack: ["HTML", "CSS", "JavaScript"],
    projects: [],
  },
  {
    id: "3",
    email: "test3@test.com",
    name: "Jane Doe",
    skills: ["Backend", "Database"],
    techStack: ["Python", "Django", "PostgreSQL"],
    projects: [],
  },
  {
    id: "4",
    email: "test4@test.com",
    name: "Alice",
    skills: ["Frontend", "Design"],
    techStack: ["JavaScript", "React", "Photoshop"],
    projects: [],
  },
  {
    id: "5",
    email: "test5@test.com",
    name: "Bob",
    skills: ["DevOps", "Backend"],
    techStack: ["Docker", "Kubernetes", "Node.js"],
    projects: [],
  },
] satisfies Array<User>;

const getRandomUser = () => {
  return EXAMPLE_USERS_DATA[
    Math.floor(Math.random() * EXAMPLE_USERS_DATA.length)
  ] as User;
};

export const EXAMPLE_PROJECTS_DATA: Array<Project> = [
  {
    id: "1",
    name: "React Todo App",
    description:
      "Build a simple todo app using React and learn the basics of state management.",
    technologyStack: ["JavaScript", "React", "Tailwind"],
    lookingForSkills: ["Frontend developer"],
    owner: getRandomUser(),
    developers: [getRandomUser(), getRandomUser()],
    githubLink: "",
  },
  {
    id: "2",
    name: "E-commerce Website",
    description:
      "Build a full-featured e-commerce website using HTML, CSS, and JavaScript.",
    technologyStack: ["HTML", "CSS", "JavaScript"],
    lookingForSkills: ["UX/UI designer"],
    owner: getRandomUser(),
    developers: [getRandomUser(), getRandomUser()],
    githubLink: "",
  },
  {
    id: "3",
    name: "Chat Application",
    description:
      "Develop a real-time chat application using WebSockets and learn about event-driven programming.",
    technologyStack: ["Next.js", "Express", "TypeScript", "React"],
    lookingForSkills: ["Backend developer"],
    owner: getRandomUser(),
    developers: [getRandomUser(), getRandomUser(), getRandomUser()],
    githubLink: "",
  },
  {
    id: "4",
    name: "Recipe App",
    description:
      "Build a simple todo app using React and learn the basics of state management.",
    technologyStack: ["JavaScript", "React", "Tailwind"],
    lookingForSkills: ["Full-stack developer"],
    owner: getRandomUser(),
    developers: [getRandomUser()],
    githubLink: "",
  },
  {
    id: "5",
    name: "Rummikub Solver",
    description: "Rummikub solver",
    technologyStack: ["Rust", "Python", "React Native"],
    lookingForSkills: ["AI developer", "Mobile developer"],
    owner: getRandomUser(),
    developers: [getRandomUser(), getRandomUser(), getRandomUser()],
    githubLink: "",
  },
  {
    id: "6",
    name: "Quizzler",
    description: "App for flashcards",
    technologyStack: ["C#", "TypeScript", "Next.js"],
    lookingForSkills: ["Full-stack developer"],
    owner: getRandomUser(),
    developers: [getRandomUser(), getRandomUser(), getRandomUser()],
    githubLink: "",
  },
  {
    id: "7",
    name: "React Todo App",
    description:
      "Build a simple todo app using React and learn the basics of state management.",
    technologyStack: ["JavaScript", "React", "Tailwind"],
    lookingForSkills: ["Frontend developer"],
    owner: getRandomUser(),
    developers: [getRandomUser(), getRandomUser(), getRandomUser()],
    githubLink: "",
  },
  {
    id: "8",
    name: "E-commerce Website",
    description:
      "Build a full-featured e-commerce website using HTML, CSS, and JavaScript.",
    technologyStack: ["HTML", "CSS", "JavaScript"],
    lookingForSkills: ["UX/UI designer"],
    owner: getRandomUser(),
    developers: [getRandomUser(), getRandomUser(), getRandomUser()],
    githubLink: "",
  },
];

export const getProjects = async () => {
  return EXAMPLE_PROJECTS_DATA;
};
