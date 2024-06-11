import { Input } from "@/_components/ui/input";

import { getAllDevelopers } from "../_api/get-all-developers";
import { DeveloperCard } from "../_components/developer-card";

const BrowseDevelopersPage = async () => {
  const developers = await getAllDevelopers();

  return (
    <section className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Find your next collaborator
        </h1>
      </div>
      <div className="mt-8 grid gap-6">
        <div className="w-full max-w-md">
          <Input
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            placeholder="Search projects..."
            type="text"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {developers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseDevelopersPage;
