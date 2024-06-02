"use client";

import type { RegisterUserDto, SkillDto, TechStackDto } from "@/_types/dto/dto";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { routes } from "@/_utils/routes";

import { signUpUser } from "../_api/client/sign-up-user";

const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  bio: z.string().optional(),
  skills: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .min(1, "At least one skill is required"),
  techStack: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .min(1, "At least one tech stack item is required"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  skills: Array<SkillDto>;
  techStacks: Array<TechStackDto>;
}

export const SignUpForm = ({ skills, techStacks }: SignUpFormProps) => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation<void, Error, RegisterUserDto>({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success("User registered successfully");
      router.push(routes.SIGN_IN);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const {
    fields: selectedSkills,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: control,
    name: "skills",
  });

  const {
    fields: selectedTechStacks,
    append: appendTechStack,
    remove: removeTechStack,
  } = useFieldArray({
    control: control,
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

  const onSubmit = (data: SignUpForm) => {
    mutate({
      ...data,
      skills: data.skills.map((skill) => skill.name),
      techStack: data.techStack.map((techStack) => techStack.name),
    });
  };

  return (
    <main className="flex-1 px-4 py-12 sm:px-6 md:py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Join Code Collab community
          </h1>
          <p className="text-gray-400">
            Collaborate with other beginner programmers on exciting projects.
          </p>
        </div>
        <Card className="w-full">
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className="sr-only" htmlFor="username">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Username"
                  type="text"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="sr-only" htmlFor="bio">
                  Bio
                </Label>
                <Input
                  id="bio"
                  placeholder="Bio"
                  type="text"
                  {...register("bio")}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="skills">Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {unselectedSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => appendSkill(skill)}
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
                      className="badge badge-selected cursor-pointer"
                      onClick={() => removeSkill(index)}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>

                {errors.skills && (
                  <p className="text-sm text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="skills">Tech stacks</Label>
                <div className="flex flex-wrap gap-2">
                  {unselectedTechStacks.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => appendTechStack(skill)}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
                <Label>Selected Tech stack</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedTechStacks.map((skill, index) => (
                    <Badge
                      key={skill.id}
                      className="badge badge-selected cursor-pointer"
                      onClick={() => removeTechStack(index)}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>

                {errors.skills && (
                  <p className="text-sm text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
