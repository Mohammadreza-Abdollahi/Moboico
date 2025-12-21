"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/navigation";

const sendOtp = async (mobile) => {
  const res = await fetch(`/api/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to: mobile }),
    cache: "no-store",
    credentials: "include",
  });
  return await res.json();
};

const LoginForm = () => {
  const [hide, setHide] = useState(true);
  const [success, setSuccess] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, password }),
        cache: "no-store",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        setSuccess(false);
        setError(
          result?.error?.name === "ValidationError"
            ? "فیلد های فرم را با دقت پر کنید!"
            : result.error || "خطایی رخ داده"
        );
      } else {
        setStep(2);
      }
    } else {
      const res = await fetch(`/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, code }),
        cache: "no-store",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage("ورود موفقیت آمیز بود.");
        setMobile("");
        setPassword("");
        redirect("/user");
      } else {
        setError(data.error || "کد وارد شده نادرست است");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <>
          <div className="my-7">
            <section className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor="mobile"
              >
                تلفن همراه
              </label>
              <input
                className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type="text"
                name="mobile"
                id="mobile"
                placeholder="شماره همراه خود را وارد کنید..."
                onChange={(e) => setMobile(e.target.value)}
              />
            </section>
          </div>

          <div className="my-7">
            <section className="relative w-full group">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor="password"
              >
                رمزعبور
              </label>
              <input
                className="w-full text-slate-800 py-2.5 pl-12 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type={hide ? "password" : "text"}
                name="password"
                id="password"
                placeholder="رمزعبور خود را وارد کنید..."
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setHide((prev) => !prev)}
                className="absolute top-1/2 pt-1 left-7 -translate-y-1/2 -translate-x-1/2 text-pal1-400 group-focus-within:text-pal4-600 text-xl cursor-pointer"
              >
                <FontAwesomeIcon icon={!hide ? faEyeSlash : faEye} />
              </div>
            </section>
          </div>

          <div className="mb-5">
            <span className="text-slate-600">
              اگر حساب کاربری ندارید ثبت نام کنید.
              <Link href="/auth/register" className="text-pal1-600 mx-2">
                ثبت نام
              </Link>
            </span>
          </div>
        </>
      )}

      {step === 2 && (
        <div className="my-7">
          <section className="relative w-full">
            <label
              className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
              htmlFor="code"
            >
              رمز یکبار مصرف
            </label>
            <input
              className="w-3/4 text-slate-800 text-center tracking-widest py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none"
              type="text"
              name="code"
              id="code"
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className="w-1/4 py-2.5 bg-pal2-500 hover:bg-pal2-600 border-2 border-pal2-500 rounded-l text-white"
              type="button"
              onClick={() => sendOtp(mobile)}
            >
              دریافت رمز
            </button>
          </section>
        </div>
      )}

      {error && (
        <div className="py-3 mt-2 bg-red-200 rounded">
          <span className="text-sm px-3 text-red-900">{error}</span>
        </div>
      )}

      {success && (
        <div className="py-3 mt-2 bg-green-200 rounded">
          <span className="text-sm px-3 text-green-900">{message}</span>
        </div>
      )}

      <button className="w-full bg-pal1-400 py-2.5 mt-5 rounded text-white border-2 hover:bg-transparent hover:text-pal4-600 transition">
        ورود
      </button>

      <div className="absolute top-2.5 right-1 flex">
        <BackButton />
      </div>
    </form>
  );
};

export default LoginForm;
