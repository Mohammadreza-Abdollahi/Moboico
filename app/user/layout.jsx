import { UserDataProvider } from "@/context/userDataContext";
import Profile from "./Profile";
import UserLayoutClient from "./UserLayoutClient";

const UserLayout = ({ children }) => {
  return (
    <>
      <UserDataProvider>
        <UserLayoutClient>
          <Profile />
          {children}
        </UserLayoutClient>
      </UserDataProvider>
    </>
  );
};

export default UserLayout;
