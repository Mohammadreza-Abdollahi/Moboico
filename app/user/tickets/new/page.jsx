"use client";

import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewTickets = () => {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [disable, setDisable] = useState(false);
  const handleOpenTicket = async () => {
    console.log(subject);
    console.log(message);
    console.log(priority);
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, message, priority }),
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 201) {
      setSuccess("تیکت شما باز و پیام شما ارسال شد.");
      setTimeout(() => {
        router.push("/user/tickets");
      }, 2000);
    } else {
      setError(data.message);
    }
  };
  return (
    <>
      <section className="relative pt-3 md:px-16">
        <div className="absolute top-1 left-0">
          <BackButton />
        </div>
        <h1 className="text-center text-2xl mt-5 mb-9">
          <b>تیکت جدید</b>
        </h1>
        <section className="relative w-full">
          <label
            className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
            htmlFor="subject"
          >
            موضوع تیکت
          </label>
          <input
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
            type={"text"}
            name={"subject"}
            id={"subject"}
            placeholder={"موضوع تیکت را وارد کنید..."}
          />
        </section>
        <div className="my-5">
          <span className="text-slate-700 me-3">سطح اهمیت :</span>
          <section className="inline-block mx-3">
            <input
              onChange={(e) => setPriority(e.target.value)}
              checked={priority === "low"}
              value="low"
              className="text-slate-900 py-2.5 px-2 w-4 h-4"
              type={"radio"}
              name={"priority"}
              id={"low"}
            />
            <label className="text-slate-700 ms-2" htmlFor="low">
              کم
            </label>
          </section>
          <section className="inline-block mx-3">
            <input
              onChange={(e) => setPriority(e.target.value)}
              checked={priority === "medium"}
              value="medium"
              className="text-slate-900 py-2.5 px-2 w-4 h-4"
              type={"radio"}
              name={"priority"}
              id={"medium"}
            />
            <label className="text-slate-700 ms-2" htmlFor="medium">
              متوسط
            </label>
          </section>
          <section className="inline-block mx-3">
            <input
              onChange={(e) => setPriority(e.target.value)}
              checked={priority === "high"}
              value="high"
              className="text-slate-900 py-2.5 px-2 w-4 h-4"
              type={"radio"}
              name={"priority"}
              id={"high"}
            />
            <label className="text-slate-700 ms-2" htmlFor="high">
              زیاد
            </label>
          </section>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-5 mt-8">
          <section className="relative w-full">
            <label
              className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
              htmlFor={"address-line"}
            >
              توضیحات
            </label>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              rows={6}
              name="address-line"
              id="address-line"
              placeholder="توضیحات لازم را وارد کنید..."
              className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
            ></textarea>
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
            disabled={disable}
            onClick={() => {
              setDisable(true);
              handleOpenTicket();
              setTimeout(() => {
                setDisable(false)
              }, 3000);
            }}
            className="w-full bg-pal1-400 hover:bg-pal1-600 disabled:bg-pal1-400/50 text-white py-2.5 rounded cursor-pointer"
          >
            ارسال
          </button>
        </div>
      </section>
    </>
  );
};

export default NewTickets;
