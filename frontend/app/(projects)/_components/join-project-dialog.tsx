"use client";

import type { CreateInvitationDto } from "@/_types/dto/dto";
import type { Project } from "@/_types/project";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { Textarea } from "@/_components/ui/textarea";
import { InvitationType } from "@/_types/invitation";

import { createInvitation } from "../_api/client/create-invitation";

interface JoinProjectDialogProps {
  project: Project;
}

const joinProjectSchema = z.object({
  message: z.string().optional(),
});

type JoinProjectForm = z.infer<typeof joinProjectSchema>;

export const JoinProjectDialog = ({ project }: JoinProjectDialogProps) => {
  const [open, setOpen] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinProjectForm>({
    resolver: zodResolver(joinProjectSchema),
  });

  const onSubmit = (data: JoinProjectForm) => {
    mutate({
      ...data,
      projectId: parseInt(project.id),
      receiverId: parseInt(project.owner.id),
      type: InvitationType.UserToProject,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Join Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send a request to join the project</DialogTitle>
          <DialogDescription>
            A request will be sent to the project owner to join the project. You
            can additionally send the message that was sent to the owner
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Textarea
              id="message"
              placeholder="Your message to owner"
              className="min-h-[100px]"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending request..." : "Send request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
