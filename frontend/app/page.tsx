import { Dashboard } from "./_components/dashboard/dashboard";
import { HomePage } from "./_components/home/home-page";
import { getCurrentUser } from "./(auth)/_api/get-current-user";

const MainPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser !== null) {
    return <Dashboard currentUser={currentUser} />;
  }

  return <HomePage />;
};

export default MainPage;
