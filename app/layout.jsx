import Header from "@/components/header/Header";
import { MobileMenuProvider } from "@/context/mobileMenuContext";
import Head from "./head";
import MobileMenu from "@/components/header/MobileMenu";
import 'swiper/css';
import 'swiper/css/pagination';
import "./globals.css";

export const metadata = {
  title: "موبویکو",
  description: "گروه فعال در حوزه مهندسی پزشکی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <Head/>
      <body>
        <MobileMenuProvider>
          <Header />
          <MobileMenu/>
          {children}
        </MobileMenuProvider>
      </body>
    </html>
  );
}
