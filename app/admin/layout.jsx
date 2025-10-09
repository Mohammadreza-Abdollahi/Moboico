import UserLayoutClient from "../UserLayoutClient";
import UserPanelHeader from "@/components/user-panel-layout/Header";
import UserPanelAside from "@/components/user-panel-layout/Aside";
import { MobileAsideProvider } from "@/context/mobileUserAsideContext";
import UserPanelFooter from "@/components/user-panel-layout/Footer";
import AdminPanelAside from "@/components/admin-panel-layout/Aside";
import AdminPanelHeader from "@/components/admin-panel-layout/Header";
import AdminPanelFooter from "@/components/admin-panel-layout/Footer";

const UserLayout = ({ children }) => {
  return (
    <>
      <MobileAsideProvider>
          <UserLayoutClient>
            <section className="h-screen">
              <AdminPanelAside />
              <AdminPanelHeader />
              <div className="w-full md:w-11/12 mr-auto pt-20 md:pt-22 px-3 pb-20">
                {children}
              </div>
              <AdminPanelFooter/>
            </section>
          </UserLayoutClient>
      </MobileAsideProvider>
    </>
  );
};

export default UserLayout;
