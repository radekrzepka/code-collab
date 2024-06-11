import { getAllSkills } from "@/(auth)/_api/server/get-all-skills";
import { getAllTechStacks } from "@/(auth)/_api/server/get-all-tech-stacks";

import { CreateProjectForm } from "../_components/create-project-form";

const CreateProjectPage = async () => {
  const [skills, techStacks] = await Promise.all([
    getAllSkills(),
    getAllTechStacks(),
  ]);

  return <CreateProjectForm skills={skills} techStacks={techStacks} />;
};

export default CreateProjectPage;
