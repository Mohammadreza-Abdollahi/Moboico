import Error from "@/components/Error";

const UserPanel = async () => {
  return (
    <>
      <section className="mt-5">
        <section className="relative px-2 py-5 mt-3 bg-white rounded border border-slate-300 flex flex-col md:flex-row gap-12">
          <span className="absolute top-0 right-5 -translate-y-1/2 bg-white px-2">
            اطلاعات کاربر
          </span>
          <div className="w-full md:w-1/2 flex justify-center md:justify-around items-center">
            <span className="me-8 md:me-3">ایمیل :</span>
            <span>{"mohammad1384abdollahi@gmail.com"}</span>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-around items-center">
            <span className="me-8 md:me-3">نام کاربری :</span>
            <span>{"Mohammadreza1384"}</span>
          </div>
        </section>
        <section className="flex justify-between gap-8">
          <div className="relative w-full min-h-60 px-2 py-5 mt-6 rounded border border-slate-300">
            <span className="absolute top-0 right-5 -translate-y-1/2 bg-white px-2">
              اخرین سفارشات
            </span>
            <Error text="هیچ سفارشی ثبت نشده!" type="danger" />
          </div>
          <div className="relative w-full min-h-60 px-2 py-5 mt-6 rounded border border-slate-300">
            <span className="absolute top-0 right-5 -translate-y-1/2 bg-white px-2">
              موردعلاقه ها
            </span>
            <Error text="هیچ موردی به موردعلاقه ها اضافه نشده!" type="danger" />
          </div>
        </section>
        <section className="flex justify-between gap-8">
          <div className="relative w-full min-h-60 px-2 py-5 mt-6 rounded border border-slate-300">
            <span className="absolute top-0 right-5 -translate-y-1/2 bg-white px-2">
              آدرس ها
            </span>
            <Error text="هیچ آدرسی ثبت نشده!" type="danger" />
          </div>
          <div className="relative w-full min-h-60 px-2 py-5 mt-6 rounded border border-slate-300">
            <span className="absolute top-0 right-5 -translate-y-1/2 bg-white px-2">
              اخرین تیکت ها
            </span>
            <Error text="هیچ موردی به تیکت ها اضافه نشده!" type="danger" />
          </div>
        </section>
      </section>
    </>
  );
};

export default UserPanel;
