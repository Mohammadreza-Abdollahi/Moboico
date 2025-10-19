const UserInfo = ({ user }) => {
  return (
    <>
      <section className="relative mb-6 px-2 py-8 md:mt-3 bg-white rounded border border-slate-300 flex flex-col md:flex-row gap-12">
        <span className="absolute text-lg top-0 right-5 -translate-y-1/2 bg-white px-2 text-slate-800">
          اطلاعات کاربر
        </span>
        <div className="w-full">
          <section className="w-full flex flex-col justify-center items-start gap-5 md:flex-row md:justify-around">
            <div className="flex items-center gap-3">
              <span>نام کاربری : </span>
              <span>{user?.username}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>تلفن همراه : </span>
              <span>{user?.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>ایمیل : </span>
              <span>{user?.email}</span>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default UserInfo;
