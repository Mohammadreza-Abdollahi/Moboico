"use client";
import BackButton from "@/components/BackButton";
import FormControler from "@/components/forms/FormControler";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { registerAction } from "./actions";
import { redirect } from "next/navigation";
import HomeButton from "@/components/HomeButton";

const RegisterForm = () => {
  const [state, formAction, pending] = useActionState(registerAction, {
    data: null,
    message: null,
    success: null,
    error: null,
  });
  useEffect(() => {
    state.success && redirect("/auth/login");
  }, [state]);
  console.log(state);
  return (
    <>
      <form action={formAction}>
        <div className="my-7">
          <FormControler
            type={"input"}
            formParams={{
              id: "username",
              name: "username",
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
              id: "password",
              name: "password",
              label: "رمز عبور",
              placeholder: "رمز عبور خود را وارد کنید...",
            }}
          />
        </div>
        <div className="mb-5">
          <span className="text-slate-600">
            ایا قبلا حساب کاربری ساخته اید؟{" "}
            <Link href={"/auth/login"} className="text-pal1-600 mx-2">
              ورود
            </Link>
          </span>
        </div>
        {state.error  (
          <div
            className={`py-3 mt-2 bg-red-200 rounded transition-all duration-150`}
          >
            <span className="text-sm px-3 text-red-900">{state.error}</span>
            <ul className="text-sm px-8 mt-2 text-red-900 list-disc">
              <li>نام کاربری باید حداقل 8 کاراکتر باشد.</li>
              <li>نام کاربری باید حاوی حروف و اعداد باشد.</li>
              <li>رمزعبور باید حداقل 8 کاراکتر باشد.</li>
              <li>
                رمزعبور باید حاوی حروف و اعداد و کاراکتر خاص : " - یا $ یا # "
                باشد.
              </li>
            </ul>
          </div>
        ) : state.success  (
          <div
            className={`py-3 mt-2 bg-green-200 rounded transition-all duration-150`}
          >
            <span className="text-sm px-3 text-green-900">{state.message}</span>
          </div>
        ) : null}
        <button
          disabled={pending}
          className="w-full cursor-pointer bg-pal1-400 py-2.5 mt-5 rounded text-white border-2 border-pal1-400 hover:border-pal4-600 hover:bg-transparent hover:text-pal4-600 disabled:opacity-50 transition-all duration-150"
        >
          {pending  <Spinner /> : "ثبت نام"}
        </button>
        <div className="absolute top-2.5 right-1 flex">
          <BackButton />
          <HomeButton />
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
