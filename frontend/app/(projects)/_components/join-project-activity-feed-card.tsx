"use client";

import type { Invitation } from "@/_types/invitation";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

import { Button } from "@/_components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { InvitationType } from "@/_types/invitation";

import { acceptInvitation } from "../_api/client/accept-invitation";
import { declineInvitation } from "../_api/client/decline-invitation";

interface JoinProjectActivityFeedCardProps {
  invitation: Invitation;
}

export const JoinProjectActivityFeedCard = ({
  invitation,
}: JoinProjectActivityFeedCardProps) => {
  const router = useRouter();

  const { mutate: acceptMutate, isLoading: acceptLoading } = useMutation<
    void,
    Error,
    void
  >({
    mutationFn: () => acceptInvitation(invitation.id),
    onSuccess: () => {
      toast.success("Invitation accepted");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: declineMutate, isLoading: declineLoading } = useMutation<
    void,
    Error,
    void
  >({
    mutationFn: () => declineInvitation(invitation.id),
    onSuccess: () => {
      toast.success("Invitation declined");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Card key={invitation.id}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Users className="h-8 w-8" />
        <div className="grid gap-1">
          <CardTitle>
            {invitation.type === InvitationType.UserToProject
              ? "Join project request"
              : "Owner send invitation"}
          </CardTitle>
          <CardDescription>
            From: <span className="font-bold">{invitation.senderName}</span>
          </CardDescription>
          <CardDescription>
            To join project:
            <span className="font-bold">{invitation.projectName}</span>
          </CardDescription>
          {invitation.message && (
            <CardDescription>
              Message: <span className="font-bold">{invitation.message}</span>
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardFooter>
        <div className="flex space-x-2">
          <Button onClick={() => acceptMutate()} disabled={acceptLoading}>
            {acceptLoading ? "Accepting invitation" : "Accept invitation"}
          </Button>
          <Button onClick={() => declineMutate()} disabled={declineLoading}>
            {declineLoading ? "Declining invitation" : "Decline invitation"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
