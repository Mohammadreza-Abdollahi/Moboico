import Header from "@/components/header/Header";
import { MobileMenuProvider } from "@/context/mobileMenuContext";
import Head from "./head";
import MobileMenu from "@/components/header/MobileMenu";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { UserDataProvider } from "@/context/userDataContext";
import UserLayoutClient from "./UserLayoutClient";

export const metadata = {
  title: "موبویکو | خانه",
  description: "گروه فعال در حوزه مهندسی پزشکی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <Head />
      <body>
        <UserDataProvider>
          <UserLayoutClient>
            <MobileMenuProvider>{children}</MobileMenuProvider>
          </UserLayoutClient>
        </UserDataProvider>
      </body>
    </html>
  );
}
