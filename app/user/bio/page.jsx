"use client";
import { useUserData } from "@/context/userDataContext";
import {
  faCheckCircle,
  faCircleNotch,
  faEye,
  faEyeSlash,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Bio = () => {
  const { userData } = useUserData();
  const [lock, setLock] = useState(true);
  const [email, setEmail] = useState(userData?.email);
  const [phone, setPhone] = useState(userData?.phone);
  const [username, setUsername] = useState(userData?.username);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [state, setState] = useState({
    data: null,
    success: null,
    message: null,
  });
  useEffect(() => {
    setEmail(userData?.email);
    setUsername(userData?.username);
    setPhone(userData?.phone);
  }, [userData]);
  const handleLock = (e) => {
    e.preventDefault();
    state.message = "";
    setLock((prev) => !prev);
    if (!lock) {
      setEmail(userData?.email);
      setPhone(userData?.phone);
      setUsername(userData?.username);
      setPassword("");
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^09\d{9}$/;
      const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9\-\$_]{8,20}$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-$#]).{8,}$/;

      const emailValid = emailRegex.test(email);
      const phoneValid = phoneRegex.test(phone);
      const usernameValid = usernameRegex.test(username);
      const passwordValid = passwordRegex.test(password);

      if (!passwordValid) {
        setState((prevState) => ({
          ...prevState,
          success: false,
          message: "رمزعبور صحیح نیست!",
        }));
        setLoading(false);
      } else if (!emailValid) {
        setState((prevState) => ({
          ...prevState,
          success: false,
          message: "ایمیل صحیح نیست!",
        }));
        setLoading(false);
      } else if (!phoneValid) {
        setState((prevState) => ({
          ...prevState,
          success: false,
          message: "تلفن همراه صحیح نیست!",
        }));
        setLoading(false);
      } else if (!usernameValid) {
        setState((prevState) => ({
          ...prevState,
          success: false,
          message: "نام کاربری صحیح نیست!",
        }));
        setLoading(false);
      }
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, username, password }),
        credentials: "include",
      });
      if (res.ok) {
        const result = await res.json();
        setState((prevState) => ({
          ...prevState,
          data: result.data,
          success: true,
          message: "کاربر با موفقیت ویرایش شد.",
        }));
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        data: null,
        success: false,
        message: "خطا در سمت سرور",
      }));
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleEdit} className="relative py-10">
        <div className="absolute top-0 flex justify-start items-center gap-2">
          <button
            onClick={handleLock}
            className="flex justify-center items-center gap-2 py-1 px-10 text-sm md:text-base rounded bg-pal2-500 hover:bg-pal2-600 text-white cursor-pointer transition-all duration-150"
          >
            {lock ? "ویرایش" : "لغو ویرایش"}
            <FontAwesomeIcon
              icon={lock ? faUnlock : faLock}
              className="text-sm md:text-lg"
            />
          </button>
          {!lock && (
            <span className="text-sm text-blue-700">
              با لغو کردن ویرایش ، تغییرات به حالت قبل باز میگردند...
            </span>
          )}
        </div>
        <section className="relative mb-6 px-2 py-8 mt-10 md:mt-3 bg-white rounded border border-slate-300 flex flex-col md:flex-row gap-12">
          <span className="absolute text-lg top-0 right-5 -translate-y-1/2 bg-white px-2 text-slate-800">
            اطلاعات شخصی
          </span>
          <div className="w-full md:w-1/3 flex justify-center md:justify-around items-center">
            <section className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor={"email"}
              >
                ایمیل
              </label>
              <input
                className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type={"email"}
                name={"email"}
                id={"email"}
                placeholder={"لطفا ایمیل خود را وارد کنید..."}
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={lock}
              />
            </section>
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-around items-center">
            <section className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor={"phone"}
              >
                تلفن همراه
              </label>
              <input
                className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type={"phone"}
                name={"phone"}
                id={"phone"}
                placeholder={"لطفا ایمیل خود را وارد کنید..."}
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value)}
                readOnly={lock}
              />
            </section>
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-around items-center">
            <section className="relative w-full">
              <label
                className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
                htmlFor={"email"}
              >
                نام کاربری
              </label>
              <input
                className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
                type={"text"}
                name={"username"}
                id={"username"}
                placeholder={"لطفا نام کاربری خود را وارد کنید..."}
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                readOnly={lock}
              />
            </section>
          </div>
        </section>
        {!state?.success && state?.message && !lock && (
          <section className="flex items-center justify-start text-sm text-red-800 rounded bg-red-100 py-3 px-3 mt-5">
            <FontAwesomeIcon icon={faCircleNotch} className="mx-2" />
            <span>{state?.message}</span>
          </section>
        )}
        {state?.success && state?.message && (
          <section className="flex items-center justify-start text-sm text-green-800 rounded bg-green-100 py-3 px-3 mt-5">
            <FontAwesomeIcon icon={faCheckCircle} className="mx-2" />
            <span>{state?.message}</span>
          </section>
        )}
        <section className="relative w-full group mt-6">
          <label
            className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
            htmlFor={"password"}
          >
            رمزعبور
          </label>
          <input
            className="w-full text-slate-800 py-2.5 pl-12 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
            type={hide ? "password" : "text"}
            name={"password"}
            id={"password"}
            placeholder={"برای تایید هویت تان رمز عبور خود را وارد کنید..."}
            readOnly={lock}
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            onClick={() => setHide((prev) => !prev)}
            className="absolute top-1/2 pt-1 left-7 -translate-y-1/2 -translate-x-1/2 text-pal1-400 group-focus-within:text-pal4-600 text-xl transition-all duration-150"
          >
            <FontAwesomeIcon icon={!hide ? faEyeSlash : faEye} />
          </div>
        </section>
        <button
          disabled={lock || loading}
          type="submit"
          className="w-full py-2 mt-5 text-center text-white bg-pal2-500 hover:bg-pal2-600 disabled:opacity-60 disabled:hover:bg-pal2-500 disabled:cursor-not-allowed rounded transition-all duration-150"
        >
          {loading ? "درحال ذخیره سازی" : "ذخیره تغییرات"}
        </button>
      </form>
    </>
  );
};

export default Bio;
