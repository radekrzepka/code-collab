"use client";

import type { Developer } from "@/_types/developer";
import type { CreateInvitationDto } from "@/_types/dto/dto";
import type { User } from "@/_types/user";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { InvitationType } from "@/_types/invitation";

import { createInvitation } from "../_api/client/create-invitation";

interface InviteUserToProjectDialogProps {
  owner: User;
  user: Developer;
}

const inviteUserToProjectSchema = z.object({
  projectId: z.string(),
});

type InviteUserToProjectForm = z.infer<typeof inviteUserToProjectSchema>;

export const InviteUserToProjectDialog = ({
  owner,
  user,
}: InviteUserToProjectDialogProps) => {
  const ownedProjects = owner.projects.filter(
    (project) =>
      project.owner.id === owner.id &&
      !project.developers.find((dev) => dev.id === user.id),
  );

  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteUserToProjectForm>({
    resolver: zodResolver(inviteUserToProjectSchema),
  });

  const { mutate, isLoading } = useMutation<void, Error, CreateInvitationDto>({
    mutationFn: createInvitation,
    onSuccess: () => {
      toast.success("Invitation send successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = ({ projectId }: InviteUserToProjectForm) => {
    mutate({
      projectId: parseInt(projectId),
      receiverId: parseInt(user.id),
      type: InvitationType.OwnerToUser,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Invite to your project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Send a request to join one of the yours project
          </DialogTitle>
          <DialogDescription>
            A request will be sent to the user to join one of the yours project
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="projectId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} {...field}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project " />
                </SelectTrigger>
                <SelectContent>
                  {ownedProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.projectId && (
            <p className="text-sm text-red-500">{errors.projectId.message}</p>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending invitation..." : "Send invitation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
