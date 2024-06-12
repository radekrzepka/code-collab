"use client";

import type { LoginUserDto, TokenDto } from "@/_types/dto/dto";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { routes } from "@/_utils/routes";
import { cn } from "@/_utils/utils";

import { signInUser } from "../_api/client/sign-in-user";

const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

interface SignInFormProps {
  redirectPath?: string;
  inDialog?: boolean;
}

export const SignInForm = ({
  redirectPath = routes.MAIN,
  inDialog = false,
}: SignInFormProps) => {
  const router = useRouter();

  const { mutate, isLoading } = useMutation<TokenDto, Error, LoginUserDto>({
    mutationFn: signInUser,
    onSuccess: ({ token }) => {
      Cookies.set("authToken", token);
      router.push(redirectPath);
      router.refresh();
    },
    onError: () => {
      toast.error("Please provide correct username or password");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDto>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: LoginUserDto) => {
    mutate(data);
  };

  return (
    <main className="flex-1 px-4 py-12 sm:px-6 md:py-24">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Sign in to Code Collab
          </h1>
          <p className="text-gray-400">
            Welcome back! Sign in to continue collaborating.
          </p>
        </div>
        <Card className={cn("w-full", inDialog && "border-none")}>
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link className="underline" href={routes.SIGN_UP}>
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};
