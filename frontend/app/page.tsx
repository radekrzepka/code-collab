import { getCurrentUser } from "./_api/user/get-current-user";
import { HomePage } from "./_components/home/home-page";

const MainPage = async () => {
  const isLoggedIn = !!(await getCurrentUser());

  if (isLoggedIn) {
    //TODO: Dashboard
  }

  return <HomePage />;
};

export default MainPage;
