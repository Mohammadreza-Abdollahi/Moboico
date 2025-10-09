const AdminPanelFooter = () => {
  return (
    <>
      <footer className="fixed bottom-0 md:right-1/12 mr-auto w-full md:w-11/12 px-5 py-3 bg-pal3-700 text-center">
        <div className="">
          <span className="text-sm text-white">
            توسعه یافته با ❤️ توسط{" "}
            <a className="hover:text-pal2-500" href="https://github.com/Mohammadreza-Abdollahi">
              Mohammadreza Abdollahi
            </a>
            {" "}و گروه مهندسی موبویکو
          </span>
        </div>
      </footer>
    </>
  );
};

export default AdminPanelFooter;
