"use client";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const [hide, setHide] = useState(true);
  const [success, setSuccess] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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
      setSuccess(true);
      setMessage("ورود موفقیت امیز بود.");
      setEmail("");
      setPassword("");
      redirect("/");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="my-7">
          <section className="relative w-full">
            <label
              className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
              htmlFor="email"
            >
              ایمیل
            </label>
            <input
              className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
              type="email"
              name="email"
              id="email"
              placeholder="ایمیل خود را وارد کنید..."
              onChange={(e) => setEmail(e.target.value)}
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
              className="absolute top-1/2 pt-1 left-7 -translate-y-1/2 -translate-x-1/2 text-pal1-400 group-focus-within:text-pal4-600 text-xl transition-all duration-150"
            >
              <FontAwesomeIcon icon={!hide ? faEyeSlash : faEye} />
            </div>
          </section>
        </div>
        <div className="mb-5">
          <span className="text-slate-600">
            اگر حساب کاربری ندارید ثبت نام کنید.{" "}
            <Link href={"/auth/register"} className="text-pal1-600 mx-2">
              ثبت نام
            </Link>
          </span>
        </div>
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
