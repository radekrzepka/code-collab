import { getCurrentUser } from "./_api/user/get-current-user";
import { Dashboard } from "./_components/dashboard/dashboard";
import { HomePage } from "./_components/home/home-page";

const MainPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser !== null) {
    return <Dashboard currentUser={currentUser} />;
  }

  return <HomePage />;
};

export default MainPage;
