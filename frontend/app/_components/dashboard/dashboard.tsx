import type { User } from "@/_types/user";
import { FileText, MessageSquare, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";

import { BrowseProjectCard } from "../project/browse-project-card";

interface DashboardProps {
  currentUser: User;
}

export const Dashboard = ({
  currentUser: { name, projects },
}: DashboardProps) => {
  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
      <div className="mx-auto flex w-full max-w-6xl items-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome, {name}!
        </h1>
      </div>
      <div>
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4">
          <h1 className="mb-4 text-2xl font-semibold">Your Projects</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <BrowseProjectCard
              project={project}
              hideLookingFor
              key={project.id}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center gap-4">
        <h1 className="text-2xl font-semibold">Activity Feed</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <MessageSquare className="h-8 w-8" />
            <div className="grid gap-1">
              <CardTitle>New Message</CardTitle>
              <CardDescription>From: User1</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="text-sm font-semibold">Received: 3h ago</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="h-8 w-8" />
            <div className="grid gap-1">
              <CardTitle>Project Invitation</CardTitle>
              <CardDescription>From: User2</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="text-sm font-semibold">Received: 1 day ago</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileText className="h-8 w-8" />
            <div className="grid gap-1">
              <CardTitle>Project Update</CardTitle>
              <CardDescription>Project: Project 1</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="text-sm font-semibold">Updated: 2 days ago</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
