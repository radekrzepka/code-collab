"use client";

import type {
  CreateProjectDto,
  SkillDto,
  TechStackDto,
} from "@/_types/dto/dto";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Textarea } from "@/_components/ui/textarea";
import { routes } from "@/_utils/routes";

import { createProject } from "../_api/client/create-project";

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  githubLink: z.string().url().optional(),
  skills: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .min(1, "At least one skill is required"),
  techStack: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .min(1, "At least one tech stack item is required"),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

interface CreateProjectFormProps {
  skills: Array<SkillDto>;
  techStacks: Array<TechStackDto>;
}

export const CreateProjectForm = ({
  skills,
  techStacks,
}: CreateProjectFormProps) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
  });

  const { mutate, isLoading } = useMutation<void, Error, CreateProjectDto>({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("Project created successfully");
      router.push(routes.MAIN);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    fields: selectedSkills,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const {
    fields: selectedTechStacks,
    append: appendTechStack,
    remove: removeTechStack,
  } = useFieldArray({
    control,
    name: "techStack",
  });

  const unselectedSkills = useMemo(
    () =>
      skills.filter(
        (skill) =>
          !selectedSkills.some((selected) => selected.name === skill.name),
      ),
    [selectedSkills, skills],
  );

  const unselectedTechStacks = useMemo(
    () =>
      techStacks.filter(
        (skill) =>
          !selectedTechStacks.some((selected) => selected.name === skill.name),
      ),
    [selectedTechStacks, techStacks],
  );

  const onSubmit = (data: CreateProjectForm) => {
    mutate({
      ...data,
      skills: data.skills.map((skill) => skill.name),
      techStacks: data.techStack.map((tech) => tech.name),
    });
  };

  return (
    <section className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <main className="mx-auto max-w-3xl space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Create Your Project
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Title</Label>
            <Input
              id="name"
              placeholder="Enter project title"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project"
              {...register("description")}
              className="min-h-[100px]"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubLink">GitHub Link (optional)</Label>
            <Input
              id="githubLink"
              placeholder="https://github.com/your-project"
              {...register("githubLink")}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex flex-wrap gap-2">
              {unselectedSkills.map((skill) => (
                <Badge
                  key={skill.id}
                  onClick={() => appendSkill(skill)}
                  variant="secondary"
                  className="cursor-pointer"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
            <Label>Selected Skills</Label>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill, index) => (
                <Badge
                  key={skill.id}
                  onClick={() => removeSkill(index)}
                  className="cursor-pointer"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="techStack">Tech Stacks</Label>
            <div className="flex flex-wrap gap-2">
              {unselectedTechStacks.map((tech) => (
                <Badge
                  key={tech.id}
                  onClick={() => appendTechStack(tech)}
                  variant="secondary"
                  className="cursor-pointer"
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
            <Label>Selected Tech Stacks</Label>
            <div className="flex flex-wrap gap-2">
              {selectedTechStacks.map((tech, index) => (
                <Badge
                  key={tech.id}
                  onClick={() => removeTechStack(index)}
                  className="cursor-pointer"
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </main>
    </section>
  );
};
