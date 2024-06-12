export enum InvitationType {
  UserToProject,
  OwnerToUser,
}

export interface Invitation {
  id: number;
  projectId: number;
  projectName: string;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  message?: string | null;
  isAccepted: boolean;
  acceptedAt?: string | null;
  type: InvitationType;
}
