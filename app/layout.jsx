import Header from "@/components/header/Header";
import "./globals.css";
import { MobileMenuProvider } from "@/context/mobileMenuContext";
import Head from "./head";
import MobileMenu from "@/components/header/MobileMenu";

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
