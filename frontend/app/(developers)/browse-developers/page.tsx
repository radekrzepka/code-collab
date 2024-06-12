import { getCurrentUser } from "@/(auth)/_api/server/get-current-user";

import { getAllDevelopers } from "../_api/get-all-developers";
import { DeveloperCard } from "../_components/developer-card";

const BrowseDevelopersPage = async () => {
  const [currentUser, developers] = await Promise.all([
    getCurrentUser(),
    getAllDevelopers(),
  ]);

  return (
    <section className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Find your next collaborator
        </h1>
      </div>
      <div className="mt-8 grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {developers.map((developer) => (
            <DeveloperCard
              key={developer.id}
              developer={developer}
              currentUser={currentUser || undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseDevelopersPage;
