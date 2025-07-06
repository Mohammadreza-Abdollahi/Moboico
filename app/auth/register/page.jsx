import BackButton from "@/components/BackButton";
import FormControler from "@/components/forms/FormControler";
import Link from "next/link";

const Register = () => {
  return (
    <>
      <section className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-11/12 md:w-3/5 lg:w-1/4 mx-auto py-10 px-3 shadow-2xl bg-white rounded">
        <span className="block text-2xl text-center mb-14 mt-6">
          <b>ثبت نام</b>
        </span>
        <form action="">
          <div className="my-7">
            <FormControler
              type={"input"}
              formParams={{
                id: "name",
                name: "name",
                label: "نام کاربری",
                placeholder: "نام کاربری خود را وارد کنید...",
              }}
            />
          </div>
          <div className="my-7">
            <FormControler
              type={"input"}
              formParams={{
                id: "email",
                name: "email",
                label: "ایمیل",
                placeholder: "ایمیل خود را وارد کنید...",
              }}
            />
          </div>
          <div className="my-7">
            <FormControler
              type={"password"}
              formParams={{
                id: "email",
                name: "email",
                label: "رمز عبور",
                placeholder: "رمز عبور خود را وارد کنید...",
              }}
            />
          </div>
          <div className="mb-5">
            <span className="text-slate-600">ایا قبلا حساب کاربری ساخته اید؟ <Link href={"/auth/login"} className="text-pal1-600 mx-2">ورود</Link></span>
          </div>
          <button className="w-full bg-pal1-400 py-2.5 rounded text-white border-2 border-pal1-400 hover:border-pal4-600 hover:bg-transparent hover:text-pal4-600 transition-all duration-150">
            ثبت نام
          </button>
          <div className="absolute top-2.5 right-1 flex">
            <BackButton/>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
