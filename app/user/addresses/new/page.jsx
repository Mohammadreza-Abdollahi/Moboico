"use client";
import { useState } from "react";
import SelectAddress from "../SelectAddress";
import { useUserData } from "@/context/userDataContext";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

const AddAddress = () => {
  const router = useRouter();
  const { userData } = useUserData();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine, setAddressLine] = useState("بدون آدرس");
  const [isDefault, setIsDefault] = useState(false);

  const handleAddAddress = async () => {
    const nameRegex = /^[آ-ی\s]{3,20}$/;
    const phoneRegex = /^09\d{9}$/;
    const postalCodeRegex = /^\d{10}$/;

    if (!userData._id) {
      setError("کاربر یافت نشد!");
      router.push("/");
    } else if (!fName || !nameRegex.test(fName)) {
      setError("نام به درستی نوشته نشده!");
      return;
    } else if (!lName || !nameRegex.test(lName)) {
      setError("نام خانوادگی به درستی نوشته نشده!");
      return;
    } else if (!province) {
      setError("استان را به درستی وارد کنید!");
      return;
    } else if (!city) {
      setError("شهر را به درستی وارد کنید!");
      return;
    } else if (!phone || !phoneRegex.test(phone)) {
      setError("تلفن همراه را به درستی وارد کنید!");
      return;
    } else if (!postalCode || !postalCodeRegex.test(postalCode)) {
      setError("کد پستی را به درستی وارد کنید!");
      return;
    } else {
      console.log(userData._id);
      const res = await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData._id,
          fullName: fName + " " + lName,
          phone,
          province,
          city,
          postalCode,
          addressLine,
          isDefault,
        }),
      });
      const data = await res.json();
      setSuccess(data.message);
      if (res.ok) {
        setSuccess("آدرس با موفقیت افزوده شد.");
        setError("");
        router.push("/user/addresses");
      }
    }
  };
  return (
    <>
      <section className="relative pt-3 md:px-16">
        <div className="absolute top-1 left-0">
          <BackButton />
        </div>
        <h1 className="text-center text-2xl">
          <b>آدرس جدید</b>
        </h1>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 mt-12">
          <section className="relative w-full">
            <label
              className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
              htmlFor="fName"
            >
              نام
            </label>
            <input
              onChange={(e) => setFName(e.target.value)}
              className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
              type={"text"}
              name={"fName"}
              id={"fName"}
              placeholder={"نام خود را وارد کنید..."}
            />
          </section>
          <section className="relative w-full">
            <label
              className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
              htmlFor="fName"
            >
              نام خانوادگی
            </label>
            <input
              onChange={(e) => setLName(e.target.value)}
              className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
              type={"text"}
              name={"lName"}
              id={"lName"}
              placeholder={"نام خانوادگی خود را وارد کنید..."}
            />
          </section>
        </div>
        <SelectAddress
          setProvince={setProvince}
          province={province}
          setCity={setCity}
        />
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 mt-8">
          <section className="relative w-full">
            <label
              className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
              htmlFor="phone"
            >
              تلفن همراه
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
              type={"text"}
              name={"phone"}
              id={"phone"}
              placeholder={"تلفن همراه خود را وارد کنید..."}
            />
          </section>
          <section className="relative w-full">
            <label
              className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
              htmlFor="postalCode"
            >
              کدپستی
            </label>
            <input
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
              type={"text"}
              name={"postalCode"}
              id={"postalCode"}
              placeholder={"کدپستی خود را وارد کنید..."}
            />
          </section>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 mt-8">
          <section className="relative w-full">
            <label
              className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
              htmlFor={"address-line"}
            >
              آدرس کامل
            </label>
            <textarea
              onChange={(e) => setAddressLine(e.target.value)}
              rows={6}
              name="address-line"
              id="address-line"
              placeholder="آدرس کامل خود را وارد کنید..."
              className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
            ></textarea>
          </section>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 mt-6">
          <section className="relative w-full flex justify-start items-center md:px-2">
            <input
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-5 h-5 mx-1 text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
              type={"checkbox"}
              name={"is-default"}
              id={"is-default"}
            />
            <label
              className="text-slate-700 bg-white px-2 cursor-pointer selection:bg-transparent"
              htmlFor={"is-default"}
            >
              انتخاب به عنوان آدرس پیشفرض
            </label>
          </section>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 mt-8">
          {error && (
            <div
              className={`w-full py-3 mt-2 bg-red-200 rounded transition-all duration-150`}
            >
              <span className="text-sm px-3 text-red-900">{error}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 mt-8">
          {success && (
            <div
              className={`w-full py-3 mt-2 bg-green-200 rounded transition-all duration-150`}
            >
              <span className="text-sm px-3 text-green-900">{success}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 mt-8">
          <button
            onClick={handleAddAddress}
            className="w-full bg-pal1-400 hover:bg-pal1-600 text-white py-2.5 rounded cursor-pointer"
          >
            افزودن
          </button>
        </div>
      </section>
    </>
  );
};

export default AddAddress;
