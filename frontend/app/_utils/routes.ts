export const routes = {
  MAIN: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",

  PROJECT: (projectId: string) => `/project/${projectId}`,
  BROWSE_PROJECTS: "/browse-projects",
  CREATE_PROJECT: "/create-project",

  DEVELOPER: (developerId: string) => `/developer/${developerId}`,
  BROWSE_DEVELOPERS: "/browse-developers",
};

export const imagesRoutes = {
  BROWSE_PROJECT_PLACEHOLDER: "/browse-project-placeholder.svg",
};
