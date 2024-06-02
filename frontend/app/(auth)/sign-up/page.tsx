import { getAllSkills } from "../_api/server/get-all-skills";
import { getAllTechStacks } from "../_api/server/get-all-tech-stacks";
import { SignUpForm } from "../_components/sign-up-form";

const SignUpPage = async () => {
  const [skills, techStacks] = await Promise.all([
    getAllSkills(),
    getAllTechStacks(),
  ]);

  return <SignUpForm skills={skills} techStacks={techStacks} />;
};

export default SignUpPage;
