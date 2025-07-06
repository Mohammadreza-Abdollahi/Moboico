import BackButton from "@/components/BackButton";
import FormControler from "@/components/forms/FormControler";
import HomeButton from "@/components/HomeButton";
import Link from "next/link";

const Register = () => {
  return (
    <>
      <section className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-11/12 md:w-3/5 lg:w-1/4 mx-auto py-10 px-3 shadow-2xl bg-white rounded">
        <span className="block text-2xl text-center mb-14 mt-6">
          <b>ورود</b>
        </span>
        <form action="">
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
            <span className="text-slate-600">
              اگر حساب کاربری ندارید ثبت نام کنید.{" "}
              <Link href={"/auth/register"} className="text-pal1-600 mx-2">
                ثبت نام
              </Link>
            </span>
          </div>
          <button className="w-full bg-pal1-400 py-2.5 rounded text-white border-2 border-pal1-400 hover:border-pal4-600 hover:bg-transparent hover:text-pal4-600 transition-all duration-150">
            ورود
          </button>
          <div className="absolute top-2.5 right-1 flex">
            <BackButton />
            <HomeButton />
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
