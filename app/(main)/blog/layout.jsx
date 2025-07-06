export const metadata = {
  title: "موبویکو | وبلاگ",
};
const BlogLayout = ({ children }) => {
  return (
    <>
      <section>
        <div>{children}</div>
      </section>
    </>
  );
};

export default BlogLayout;
