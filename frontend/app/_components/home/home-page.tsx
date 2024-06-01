import Link from "next/link";
import { Briefcase, Folder, Users } from "lucide-react";

import { routes } from "@/_utils/routes";
import { getProjects } from "@/(projects)/_api/get-projects";
import { CarouselProjectCard } from "@/(projects)/_components/carousel-project-card";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export const HomePage = async () => {
  const projects = await getProjects();

  return (
    <main>
      <section className="container mx-auto grid gap-12 px-4 py-12 md:px-6">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Find Your Perfect Project Partner
          </h1>
          <p className="text-lg text-gray-400 md:text-xl lg:text-2xl">
            Collaborate with fellow beginners to build amazing projects
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
              href={routes.SIGN_IN}
            >
              Sign In
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-6 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
              href={routes.SIGN_UP}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-muted px-4 py-12  md:px-6 md:py-16 lg:py-20">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-6 lg:grid-cols-3 lg:gap-20">
          <div className="space-y-4">
            <Folder className="h-10 w-10" />
            <h3 className="text-2xl font-bold">Create and Join Projects</h3>
            <p className="text-gray-400">
              Easily create new projects or join existing ones to collaborate
              with fellow beginners.
            </p>
          </div>
          <div className="space-y-4">
            <Users className="h-10 w-10" />
            <h3 className="text-2xl font-bold">Connect with Peers</h3>
            <p className="text-gray-400">
              Build a network of like-minded beginners and support each other on
              your coding journey.
            </p>
          </div>
          <div className="space-y-4">
            <Briefcase className="h-10 w-10" />
            <h3 className="text-2xl font-bold">Build Your Portfolio</h3>
            <p className="text-gray-400">
              Showcase your skills and projects to potential employers or
              collaborators.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Browse Projects
            </h2>
            <p className="text-gray-400 md:text-lg">
              Explore available projects and get started collaborating today.
            </p>
            <Link
              href={routes.BROWSE_PROJECTS}
              className="underline  md:text-lg"
            >
              Browse for more projects
            </Link>
          </div>
          <Carousel className="mx-auto max-w-xs lg:max-w-lg xl:max-w-5xl 2xl:max-w-none">
            <CarouselContent className="-ml-4">
              {projects.map((project) => (
                <CarouselProjectCard project={project} key={project.id} />
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </main>
  );
};
