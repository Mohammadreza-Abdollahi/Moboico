import { UserDataProvider } from "@/context/userDataContext";
import UserLayoutClient from "./UserLayoutClient";
import UserPanelHeader from "@/components/user-panel-layout/Header";
import UserPanelAside from "@/components/user-panel-layout/Aside";
import { MobileAsideProvider } from "@/context/mobileUserAsideContext";
import UserPanelFooter from "@/components/user-panel-layout/Footer";

const UserLayout = ({ children }) => {
  return (
    <>
      <MobileAsideProvider>
        <UserDataProvider>
          <UserLayoutClient>
            <section className="h-screen">
              <UserPanelAside />
              <UserPanelHeader />
              <div className="w-full md:w-9/12 mr-auto pt-20 md:pt-22 px-3">
                {children}
              </div>
              <UserPanelFooter/>
            </section>
          </UserLayoutClient>
        </UserDataProvider>
      </MobileAsideProvider>
    </>
  );
};

export default UserLayout;
