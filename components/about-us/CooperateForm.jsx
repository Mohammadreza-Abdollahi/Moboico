"use client";

import { sendCooperate } from "@/app/actions/sendCooperate";
import { useActionState } from "react";
import Spinner from "../Spinner";

const CooperateForm = () => {
  const [state, formAction, pending] = useActionState(sendCooperate, {
    data: null,
    success: null,
    message: null,
  });
  console.log(state);
  return (
    <>
      <section className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-2xl text-slate-800">دعوت به همکاری</span>
          <p className="w-1/3 mx-auto mb-3 mt-5 text-pal1-600">
            دوستانی که مایل به همکاری با گروه مهندسی موبویکو هستند در هر زمینه و
            تخصصی که مناسب با نیاز های گزوه باشد میتوانند درخواست ارسال کنند تا
            ما در اولین فرصت با ایشان تماس بگیریم. با ارزوی موفقیت برای شما...
          </p>
        </div>
        <form action={formAction} className="w-2/3 mx-auto">
          <section className="flex justify-between items-center gap-8">
            <div className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor="name"
              >
                نام و نام خانوادگی
              </label>
              <input
                className="w-full text-slate-800 py-2 text-lg px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor="title"
              >
                عنوان مایل به همکاری
              </label>
              <input
                className="w-full text-slate-800 py-2 text-lg px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type="text"
                name="title"
                id="title"
              />
            </div>
          </section>
          <section className="flex justify-between items-center gap-8 mt-8">
            <div className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor="phone"
              >
                تلفن همراه
              </label>
              <input
                className="w-full text-slate-800 py-2 text-lg px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type="text"
                name="phone"
                id="phone"
              />
            </div>
            <div className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor="email"
              >
                ایمیل
              </label>
              <input
                className="w-full text-slate-800 py-2 text-lg px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type="email"
                name="email"
                id="email"
              />
            </div>
          </section>
          <section className="mt-8">
            <div className="relative">
              <label
                htmlFor="explanation"
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
              >
                توضیحات تکمیلی
              </label>
              <textarea
                name="explanation"
                id="explanation"
                className="w-full text-slate-800 py-2 text-lg px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
              ></textarea>
            </div>
          </section>
          {state.error ? (
            <div
              className={`py-3 mt-2 bg-red-200 rounded transition-all duration-150`}
            >
              <span className="text-sm px-3 text-red-900">{state.error}</span>
            </div>
          ) : state.success ? (
            <div
              className={`py-3 mt-2 bg-green-200 rounded transition-all duration-150`}
            >
              <span className="text-sm px-3 text-green-900">
                {state.message}
              </span>
            </div>
          ) : null}
          <button
            disabled={pending}
            className="w-full cursor-pointer mt-4 mb-3 text-center bg-pal1-400 hover:text-pal4-800 hover:bg-white hover:border hover:border-pal4-600 rounded py-2 text-white disabled:opacity-50 transition-all duration-150"
          >
            {pending ? <Spinner /> : "ارسال"}
          </button>
        </form>
      </section>
    </>
  );
};

export default CooperateForm;
