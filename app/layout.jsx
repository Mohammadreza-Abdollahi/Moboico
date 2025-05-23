import Header from "@/components/header/Header";
import "./globals.css";
import { MobileMenuProvider } from "@/context/mobileMenuContext";

export const metadata = {
  title: "موبویکو",
  description: "گروه فعال در حوزه مهندسی پزشکی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <MobileMenuProvider>
          <Header />
          {children}
        </MobileMenuProvider>
      </body>
    </html>
  );
}
