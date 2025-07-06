import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import MobileMenu from "@/components/header/MobileMenu";

export const metadata = {
  title: "موبویکو | خانه",
  description: "گروه فعال در حوزه مهندسی پزشکی",
};

export default function RootLayout({ children }) {
  return (
    <section>
      <Header />
      <MobileMenu />
      {children}
      <Footer />
    </section>
  );
}
