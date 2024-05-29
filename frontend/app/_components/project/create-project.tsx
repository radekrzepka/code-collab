import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Textarea } from "@/_components/ui/textarea";

interface CreateProjectProps {}

export const CreateProject = ({}: CreateProjectProps) => {
  return (
    <div className="w-full px-4 py-12 md:px-6 lg:px-8">
      <main className="mx-auto max-w-3xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Create a New Project</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Let&apos;s get started with your new project. Fill out the details
              below.
            </p>
          </div>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" placeholder="Enter project title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                className="min-h-[100px]"
                id="description"
                placeholder="Describe your project"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Input
                id="skills"
                placeholder="Enter required skills separated by commas"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals">Project Goals</Label>
              <Textarea
                className="min-h-[100px]"
                id="goals"
                placeholder="What are the goals of your project?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="search">Find Collaborators</Label>
              <Input id="search" placeholder="Search for users by skills" />
            </div>
            <Button className="w-full" type="submit">
              Create Project
            </Button>
          </form>
        </div>
        <section className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold">Inspiration</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Weather App</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  A simple weather app that fetches data from an API and
                  displays it.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recipe Finder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  An app that helps users find recipes based on ingredients they
                  have.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quiz App</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  A fun quiz app for users to test their general knowledge.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};
