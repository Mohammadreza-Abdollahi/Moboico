"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";
const sendOtp = async (phone) => {
  const res = await fetch(`/api/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to: phone }),
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
const LoginForm = () => {
  const [hide, setHide] = useState(true);
  const [success, setSuccess] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [step, setStep] = useState(1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
        cache: "no-store",
        credentials: "include",
      });
      const result = await res.json();
      console.log(result);
      if (!res.ok) {
        setSuccess(false);
        setError(
          result.error.name == "ValidationError"
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
        body: JSON.stringify({ phone, userOtp }),
        cache: "no-store",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setSuccess(true);
        setMessage("ورود موفقیت امیز بود.");
        setPhone("");
        setPassword("");
        redirect("/user");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <div className="my-7">
            <section className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor="phone"
              >
                تلفن همراه
              </label>
              <input
                className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type="text"
                name="phone"
                id="phone"
                placeholder="شماره همراه خود را وارد کنید..."
                onChange={(e) => setPhone(e.target.value)}
              />
            </section>
          </div>
        ) : null}
        {step === 1 ? (
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
                className="absolute top-1/2 pt-1 left-7 -translate-y-1/2 -translate-x-1/2 text-pal1-400 group-focus-within:text-pal4-600 text-xl transition-all duration-150"
              >
                <FontAwesomeIcon icon={!hide ? faEyeSlash : faEye} />
              </div>
            </section>
          </div>
        ) : null}
        {step === 1 ? (
          <div className="mb-5">
            <span className="text-slate-600">
              اگر حساب کاربری ندارید ثبت نام کنید.{" "}
              <Link href={"/auth/register"} className="text-pal1-600 mx-2">
                ثبت نام
              </Link>
            </span>
          </div>
        ) : null}
        {step === 2 ? (
          <div className="my-7">
            <section className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor="phone"
              >
                رمز یکبار مصرف
              </label>
              <input
                className="w-3/4 text-slate-800 text-center tracking-widest py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type="text"
                name="phone"
                id="phone"
                placeholder=""
                onChange={(e) => setUserOtp(e.target.value)}
              />
              <button
                className="w-1/4 py-2.5 bg-pal2-500 hover:bg-pal2-600 border-2 border-pal2-500 rounded-l text-white cursor-pointer"
                type="button"
                onClick={() => sendOtp(phone)}
              >
                دریافت رمز
              </button>
            </section>
          </div>
        ) : null}
        {error ? (
          <div
            className={`py-3 mt-2 bg-red-200 rounded transition-all duration-150`}
          >
            <span className="text-sm px-3 text-red-900">{error}</span>
          </div>
        ) : success ? (
          <div
            className={`py-3 mt-2 bg-green-200 rounded transition-all duration-150`}
          >
            <span className="text-sm px-3 text-green-900">{message}</span>
          </div>
        ) : null}
        <button className="w-full cursor-pointer bg-pal1-400 py-2.5 mt-5 rounded text-white border-2 border-pal1-400 hover:border-pal4-600 hover:bg-transparent hover:text-pal4-600 disabled:opacity-50 transition-all duration-150">
          ورود
        </button>
        <div className="absolute top-2.5 right-1 flex">
          <BackButton />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
