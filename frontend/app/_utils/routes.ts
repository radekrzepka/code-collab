export const routes = {
  MAIN: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  BROWSE_PROJECTS: "/browse-projects",
  BROWSE_DEVELOPERS: "/browse-developers",
  PROJECT: (projectId: string) => `/project/${projectId}`,
  DEVELOPER: (developerId: string) => `/developer/${developerId}`,
};

export const imagesRoutes = {
  BROWSE_PROJECT_PLACEHOLDER: "/browse-project-placeholder.svg",
};
