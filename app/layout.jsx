import Header from "@/components/header/Header";
import { MobileMenuProvider } from "@/context/mobileMenuContext";
import Head from "./head";
import MobileMenu from "@/components/header/MobileMenu";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./globals.css";
import Footer from "@/components/footer/Footer";

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
          <Footer/>
        </MobileMenuProvider>
      </body>
    </html>
  );
}
