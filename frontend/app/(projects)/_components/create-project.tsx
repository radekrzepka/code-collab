import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Textarea } from "@/_components/ui/textarea";

interface CreateProjectProps {}

export const CreateProject = ({}: CreateProjectProps) => {
  return (
    <section className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <main className="mx-auto max-w-3xl space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Find your next collaborator
          </h1>
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
      </main>
    </section>
  );
};
