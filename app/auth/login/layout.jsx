export const metadata = {
  title: "موبویکو | ثبت نام",
  description: "گروه فعال در حوزه مهندسی پزشکی",
};
const AuthLayout = ({ children }) => {
  return (
    <>
      <section className="w-screen h-screen bg-gradient-to-b md:bg-gradient-to-r from-back-gradient-3 to-back-gradient-4">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
