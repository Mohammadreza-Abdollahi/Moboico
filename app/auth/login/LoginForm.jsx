import BackButton from "@/components/BackButton";
import FormControler from "@/components/forms/FormControler";
import HomeButton from "@/components/HomeButton";
import Link from "next/link";

const LoginForm = () => {
  return (
    <>
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
    </>
  );
};

export default LoginForm;
