import { Linkedin, MailIcon } from "lucide-react";

import { GithubIcon } from "@/_components/icons";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { env } from "@/_utils/envs/server";

const SignUpPage = () => {
  return (
    <main className="flex-1 px-4 py-12 sm:px-6 md:py-24">
      <div className="mx-auto flex max-w-md flex-col items-center gap-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Join the Collab community
          </h1>
          <p className="text-gray-400">
            Collaborate with other beginner programmers on exciting projects.
          </p>
        </div>
        <Card className="w-full">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="sr-only" htmlFor="username">
                Username
              </Label>
              <Input id="username" placeholder="Username" type="text" />
            </div>
            <div className="space-y-2">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input id="email" placeholder="Email" type="email" />
            </div>

            <div className="space-y-2">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input id="password" placeholder="Password" type="password" />
            </div>

            <Button className="w-full">Sign up</Button>
            {env.ALLOW_SOCIAL_MEDIA_REGISTER !== "false" && (
              <>
                {" "}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-gray-800" />
                  <span className="text-sm text-gray-400">or sign up with</span>
                  <div className="h-px flex-1 bg-gray-800" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline">
                    <MailIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline">
                    <GithubIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SignUpPage;
