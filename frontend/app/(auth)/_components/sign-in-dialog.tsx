import type { Project } from "@/_types/project";

import { Button } from "@/_components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/_components/ui/dialog";
import { routes } from "@/_utils/routes";

import { SignInForm } from "./sign-in-form";

interface SignInDialogProps {
  project: Project;
}

export const SignInDialog = ({ project }: SignInDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Join Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <SignInForm inDialog redirectPath={routes.PROJECT(project.id)} />
      </DialogContent>
    </Dialog>
  );
};
